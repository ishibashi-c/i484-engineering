/** Preflight for repo-owned tests and process helpers, before Bun starts a test worker.
 * This is a source guard, not a sandbox: generated code, opaque command strings,
 * imported code outside tests/, and aliases/computed methods need manual review.
 */
import { createHash } from "node:crypto"
import { existsSync, readdirSync, readFileSync } from "node:fs"
import path from "node:path"

type Token = { value: string; literal: boolean; offset: number }
export type SafetyFinding = { file: string; line: number; reason: string }
const SAFE_SIGNALS = new Set(["0", "1", "2", "9", "15", "SIGHUP", "SIGINT", "SIGKILL", "SIGTERM"])
const NUMERIC_SIGNAL = /^\d+$/
export const TEST_FILE = /\.(?:test|spec)\.[cm]?[jt]sx?$/
const SOURCE_FILE = /\.(?:[cm]?[jt]sx?|py)$/
const JSX_FILE = /\.[jt]sx$/
const JSX_SIGNAL_API = /\b(?:kill|killpg|raise_signal|send_signal|pthread_kill|abort|killSignal)\b/
const TOKEN = /[A-Za-z_$][\w$]*|\d+|\+\+|--|\?\.|=>|[^\s]/y

// These helpers intentionally forward/re-raise signals. Approval binds reviewed
// executable content, not a filename, import, or comment that can survive a removed guard.
const REVIEWED_HELPERS: Record<string, string> = {
  "tests/helpers/process-safety.ts":
    "4cf6c57609656d576f390f2f9e11a023a0561cb38acf7cd4ed4fa093422adc5c",
  "tests/skills/helpers/run-in-group.py":
    "4dd2e800ddf1d26bb12347a16d4a3fe5c331ab8856159cc4a11935dfdc44142a",
}

const SPACE = /\s/
const F_STRING_PREFIX = /^(?:f|fr|rf)$/i
const REGEX_CONTEXT = new Set([
  "=",
  "=>",
  "(",
  ",",
  "[",
  ":",
  "return",
  "|",
  "&",
  "?",
  ";",
  "{",
  "+",
  "-",
  "*",
  "/",
  "%",
  "^",
  "~",
  "throw",
  "in",
])

// A slash may hide text only after an unambiguous expression-start token.
// Braces and postfix operators can end expressions, so ambiguous contexts stay
// executable. This deliberately favors review over silently hiding a delivery.
function regexMayStart(input: Token[]): boolean {
  let index = input.length - 1
  // `!` preserves the prior context: prefix negation versus TS postfix assertion.
  while (input[index]?.value === "!" && !input[index].literal) {
    index--
  }
  const previous = input[index]
  if ([".", "?."].includes(input[index - 1]?.value)) {
    return false
  }
  return !previous || (!previous.literal && REGEX_CONTEXT.has(previous.value))
}

type Literal = { end: number; value: string; expressions: { start: number; end: number }[] }

function regexEnd(source: string, start: number): number {
  let inClass = false
  for (let index = start + 1; index < source.length; index++) {
    if (source[index] === "\n" || source[index] === "\r") {
      throw new Error("Unclosed source regex")
    }
    if (source[index] === "\\") {
      index++
      continue
    }
    if (source[index] === "[") {
      inClass = true
    }
    if (source[index] === "]") {
      inClass = false
    }
    if (source[index] === "/" && !inClass) {
      return index
    }
  }
  throw new Error("Unclosed source regex")
}

function expressionEnd(source: string, start: number, python: boolean): number {
  let depth = 1
  const history: Token[] = []
  let index = start
  while (index < source.length) {
    const char = source[index]
    if (SPACE.test(char)) {
      index++
      continue
    }
    if ("\"'`".includes(char)) {
      index = readLiteral(source, index, python, false).end
      history.push({ value: "literal", literal: true, offset: index })
      continue
    }
    if ((!python && source.startsWith("//", index)) || (python && char === "#")) {
      const end = source.indexOf("\n", index)
      index = end < 0 ? source.length : end
      continue
    }
    if (!python && source.startsWith("/*", index)) {
      const end = source.indexOf("*/", index + 2)
      if (end < 0) {
        throw new Error("Unclosed source comment in executable interpolation")
      }
      index = end + 2
      continue
    }
    if (!python && char === "/" && regexMayStart(history)) {
      index = regexEnd(source, index) + 1
      history.push({ value: "literal", literal: true, offset: index })
      continue
    }
    TOKEN.lastIndex = index
    const match = TOKEN.exec(source)
    if (!match) {
      throw new Error(`Cannot inspect interpolation at offset ${index}`)
    }
    history.push({ value: match[0], literal: false, offset: index })
    if (match[0] === "{") {
      depth++
    }
    if (match[0] === "}" && --depth === 0) {
      return index
    }
    index = TOKEN.lastIndex
  }
  throw new Error("Unclosed executable interpolation; inspect this source manually")
}

function readLiteral(source: string, start: number, python: boolean, fString: boolean): Literal {
  const quote = source[start]
  const delimiter = python && source.startsWith(quote.repeat(3), start) ? quote.repeat(3) : quote
  const bodyStart = start + delimiter.length
  const expressions: Literal["expressions"] = []
  let index = bodyStart
  while (index < source.length) {
    if (source[index] === "\\") {
      // Python f-string braces remain executable even after a backslash.
      index += fString && source[index + 1] === "{" ? 1 : 2
      continue
    }
    if (source.startsWith(delimiter, index)) {
      return { end: index + delimiter.length, value: source.slice(bodyStart, index), expressions }
    }
    const templateExpression = quote === "`" && source.startsWith("${", index)
    if (fString && source.startsWith("{{", index)) {
      index += 2
      continue
    }
    if (templateExpression || (fString && source[index] === "{")) {
      const expressionStart = index + (templateExpression ? 2 : 1)
      const end = expressionEnd(source, expressionStart, python)
      expressions.push({ start: expressionStart, end })
      index = end + 1
    } else {
      index++
    }
  }
  throw new Error("Unclosed source literal; inspect this source manually")
}

function tokens(source: string, python = false, base = 0): Token[] {
  const result: Token[] = []
  let index = 0
  while (index < source.length) {
    const char = source[index]
    if (SPACE.test(char)) {
      index++
      continue
    }
    if ((!python && source.startsWith("//", index)) || (python && char === "#")) {
      const end = source.indexOf("\n", index)
      index = end < 0 ? source.length : end
      continue
    }
    if (!python && source.startsWith("/*", index)) {
      const end = source.indexOf("*/", index + 2)
      if (end < 0) {
        throw new Error("Unclosed source comment")
      }
      index = end + 2
      continue
    }
    if ("\"'`".includes(char)) {
      const prefix = result.at(-1)
      const fString =
        python &&
        !!prefix &&
        prefix.offset + prefix.value.length === base + index &&
        F_STRING_PREFIX.test(prefix.value)
      const literal = readLiteral(source, index, python, fString)
      result.push({ value: literal.value, literal: true, offset: base + index })
      for (const expression of literal.expressions) {
        result.push(
          ...tokens(
            source.slice(expression.start, expression.end),
            python,
            base + expression.start,
          ),
        )
      }
      index = literal.end
      continue
    }
    // Regex text is inert, including quotes/braces that are not source syntax.
    if (!python && char === "/" && regexMayStart(result)) {
      const end = regexEnd(source, index)
      result.push({ value: source.slice(index, end + 1), literal: true, offset: base + index })
      index = end + 1
      continue
    }
    TOKEN.lastIndex = index
    const match = TOKEN.exec(source)
    if (!match) {
      throw new Error(`Cannot inspect source at offset ${index}`)
    }
    result.push({ value: match[0], literal: false, offset: base + index })
    index = TOKEN.lastIndex
  }
  return result
}

function callArgs(input: Token[], start: number): Token[][] {
  const args: Token[][] = [[]]
  const closers: string[] = []
  const matching: Record<string, string> = { "(": ")", "[": "]", "{": "}" }
  for (let index = start + 1; index < input.length; index++) {
    const token = input[index]
    if (!token.literal && token.value === ")" && closers.length === 0) {
      return args
    }
    if (!token.literal && token.value === "," && closers.length === 0) {
      args.push([])
    } else {
      args.at(-1).push(token)
      if (!token.literal && matching[token.value]) {
        closers.push(matching[token.value])
      } else if (
        !token.literal &&
        [")", "]", "}"].includes(token.value) &&
        closers.pop() !== token.value
      ) {
        throw new Error("Unbalanced signal call; inspect this source manually")
      }
    }
  }
  throw new Error("Unclosed signal call; inspect this source manually")
}

function safeArgument(arg: Token[] | undefined): boolean {
  if (!arg || arg.length === 0) {
    return true // child.kill() defaults to TERM (Python Popen.kill to KILL).
  }
  if (arg.length === 1) {
    return (arg[0].literal || NUMERIC_SIGNAL.test(arg[0].value)) && SAFE_SIGNALS.has(arg[0].value)
  }
  return (
    arg.length === 3 &&
    arg[0].value === "signal" &&
    arg[1].value === "." &&
    SAFE_SIGNALS.has(arg[2].value)
  )
}

export function inspectProcessTestSource(file: string, source: string): SafetyFinding[] {
  const approved = REVIEWED_HELPERS[file]
  if (approved && createHash("sha256").update(source).digest("hex") === approved) {
    return []
  }
  // JSX text is not JavaScript string syntax. Conservatively require review
  // when any signal API name appears, including inert text or safe signals.
  // This prevents text quotes/comments from hiding executable JSX expressions.
  const jsxSignal = JSX_FILE.test(file) ? JSX_SIGNAL_API.exec(source) : null
  if (jsxSignal) {
    return [
      {
        file,
        line: source.slice(0, jsxSignal.index).split("\n").length,
        reason:
          "JSX/TSX signal API content requires manual process-safety review; this source guard cannot approve its syntax, even when the occurrence looks inert or the signal is safe.",
      },
    ]
  }
  let input: Token[]
  try {
    input = tokens(source, file.endsWith(".py"))
  } catch (error) {
    throw new Error(`${file}: ${String(error)}`, { cause: error })
  }
  const findings: SafetyFinding[] = []
  for (let i = 0; i < input.length; i++) {
    const token = input[i]
    const call = i + (input[i + 1]?.value === "?." ? 2 : 1)
    if (token.literal || input[call]?.value !== "(") {
      continue
    }
    const receiver = [".", "?."].includes(input[i - 1]?.value) ? input[i - 2]?.value : undefined
    let signal: Token[] | undefined
    let unsafe = false
    if (token.value === "abort" && (receiver === "process" || receiver === "os")) {
      unsafe = true
    } else if (
      receiver &&
      ["kill", "killpg", "raise_signal", "send_signal", "pthread_kill"].includes(token.value)
    ) {
      const args = callArgs(input, call)
      const signalIndex =
        token.value === "pthread_kill" ||
        (token.value !== "raise_signal" && (receiver === "process" || receiver === "os"))
          ? 1
          : 0
      signal = args[signalIndex]
      unsafe = !safeArgument(signal)
    }
    if (!unsafe) {
      continue
    }
    findings.push({
      file,
      line: source.slice(0, token.offset).split("\n").length,
      reason:
        "Direct crash or unverified dynamic signal delivery; use processSignalPolicy and sendTestSignal in tests/helpers/process-safety.ts. Reviewed forwarding helpers require safety review before their fingerprint is updated.",
    })
  }
  return findings
}

function sources(root: string, dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name)
    if (entry.isSymbolicLink()) {
      throw new Error(`Process safety source is a symlink: ${path.relative(root, full)}`)
    }
    if (entry.isDirectory()) {
      return sources(root, full)
    }
    return SOURCE_FILE.test(entry.name) ? [full] : []
  })
}

export function checkProcessTestSafety(root: string, external: string[] = []): SafetyFinding[] {
  const tests = path.join(root, "tests")
  const owned = existsSync(tests)
    ? sources(root, tests)
    : sources(root, root).filter((file) => TEST_FILE.test(file))
  const files = new Set([...owned, ...external.map((file) => path.resolve(root, file))])
  return [...files].flatMap((file) =>
    inspectProcessTestSource(
      path.relative(root, file).split(path.sep).join("/"),
      readFileSync(file, "utf8"),
    ),
  )
}

if (import.meta.main) {
  const findings = checkProcessTestSafety(process.cwd(), process.argv.slice(2))
  for (const finding of findings) {
    console.error(`${finding.file}:${finding.line}: ${finding.reason}`)
  }
  process.exitCode = findings.length > 0 ? 1 : 0
}
