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
const TOKEN =
  /\/\/[^\n]*|\/\*[\s\S]*?\*\/|#[^\n]*|"""[\s\S]*?"""|'''[\s\S]*?'''|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|[A-Za-z_$][\w$]*|\d+|[^\s]/g

// These helpers intentionally forward/re-raise signals. Approval binds reviewed
// executable content, not a filename, import, or comment that can survive a removed guard.
const REVIEWED_HELPERS: Record<string, string> = {
  "tests/helpers/process-safety.ts":
    "4cf6c57609656d576f390f2f9e11a023a0561cb38acf7cd4ed4fa093422adc5c",
  "tests/skills/helpers/run-in-group.py":
    "4dd2e800ddf1d26bb12347a16d4a3fe5c331ab8856159cc4a11935dfdc44142a",
}

function tokens(source: string): Token[] {
  return [...source.matchAll(TOKEN)].flatMap((match) => {
    const [value] = match
    if (value.startsWith("//") || value.startsWith("/*") || value.startsWith("#")) {
      return []
    }
    const literal = value.startsWith('"') || value.startsWith("'") || value.startsWith("`")
    return [{ value: literal ? value.slice(1, -1) : value, literal, offset: match.index }]
  })
}

function callArgs(input: Token[], start: number): Token[][] {
  const args: Token[][] = [[]]
  let depth = 0
  for (let index = start + 1; index < input.length; index++) {
    const token = input[index]
    if (!token.literal && token.value === ")" && depth === 0) {
      break
    }
    if (!token.literal && token.value === "," && depth === 0) {
      args.push([])
    } else {
      args.at(-1).push(token)
      if (!token.literal && ["(", "[", "{"].includes(token.value)) {
        depth++
      }
      if (!token.literal && [")", "]", "}"].includes(token.value)) {
        depth--
      }
    }
  }
  return args
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
  const input = tokens(source)
  const findings: SafetyFinding[] = []
  for (let i = 0; i < input.length; i++) {
    const token = input[i]
    if (token.literal || input[i + 1]?.value !== "(") {
      continue
    }
    const receiver = input[i - 1]?.value === "." ? input[i - 2]?.value : undefined
    let signal: Token[] | undefined
    let unsafe = false
    if (token.value === "abort" && receiver === "process") {
      unsafe = true
    } else if (receiver && ["kill", "killpg", "raise_signal"].includes(token.value)) {
      const args = callArgs(input, i + 1)
      signal =
        args[
          token.value === "raise_signal" || (receiver !== "process" && receiver !== "os") ? 0 : 1
        ]
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
