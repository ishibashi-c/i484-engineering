import { describe, expect, test } from "bun:test"
import { spawnSync } from "node:child_process"
import { mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import path from "node:path"
import {
  checkProcessTestSafety,
  inspectProcessTestSource,
} from "../scripts/check-process-test-safety"

const inspect = (source: string, file = "tests/example.test.ts") =>
  inspectProcessTestSource(file, source)

describe("process test safety preflight", () => {
  test("rejects direct crash sends, including numeric signals", () => {
    expect(inspect('child.kill("SIGQUIT")')).toHaveLength(1)
    expect(inspect('process.kill(pid, "SIGABRT")')).toHaveLength(1)
    expect(inspect("process.kill(pid, 3)")).toHaveLength(1)
    expect(inspect("process.abort()")).toHaveLength(1)
    expect(inspect('child.kill?.("SIGQUIT")')).toHaveLength(1)
    expect(inspect('process.kill?.(pid, "SIGQUIT")')).toHaveLength(1)
    expect(inspect("process.abort?.()")).toHaveLength(1)
    expect(inspect('child.kill?.("SIGTERM")')).toEqual([])
    expect(inspect("os.kill(os.getpid(), signal.SIGQUIT)", "tests/helper.py")).toHaveLength(1)
  })
  test("does not execute inert data or flag comments and quoted examples", () => {
    expect(inspect('// child.kill("SIGQUIT")\nconst example = \'child.kill("SIGQUIT")\'')).toEqual(
      [],
    )
    expect(inspect('const fixture = `process.kill(pid, "SIGQUIT")`')).toEqual([])
    expect(inspect('const regex = /}/.test("}")')).toEqual([])
    expect(inspect('const regex = !/child\\.kill\\("SIGQUIT"\\)/.test(text)')).toEqual([])
    expect(inspect('child.kill("SIGTERM"); process.kill(pid, 0); child.kill()')).toEqual([])
  })
  test("dynamic direct sends require the runtime guard even with a policy import", () => {
    expect(
      inspect('import {processSignalPolicy} from "./helpers/process-safety"; child.kill(signal)'),
    ).toHaveLength(1)
    expect(inspect("sendTestSignal(child, signal)")).toEqual([])
  })
  test("Python dynamic self re-raising is rejected outside the reviewed helper", () => {
    expect(inspect("os.kill(os.getpid(), signum)", "tests/helper.py")).toHaveLength(1)
  })
  test("removing the shared delivery gate invalidates its approval", () => {
    const helper = readFileSync(path.resolve(import.meta.dir, "helpers/process-safety.ts"), "utf8")
    expect(inspect(helper, "tests/helpers/process-safety.ts")).toEqual([])
    expect(
      inspect(helper.replace("if (policy.skip)", "if (false)"), "tests/helpers/process-safety.ts"),
    ).not.toEqual([])
    const python = readFileSync(
      path.resolve(import.meta.dir, "skills/helpers/run-in-group.py"),
      "utf8",
    )
    expect(inspect(python, "tests/skills/helpers/run-in-group.py")).toEqual([])
    expect(
      inspect(
        `${python}\nos.kill(os.getpid(), signal.SIGQUIT)\n`,
        "tests/skills/helpers/run-in-group.py",
      ),
    ).not.toEqual([])
  })
  test("inspects executable JS interpolation while preserving inert template text", () => {
    expect(inspect('const message = `${child.kill("SIGQUIT")}`')).toHaveLength(1)
    expect(
      inspect('const message = `${(() => { const text = "}"; child.kill("SIGQUIT") })()}`'),
    ).toHaveLength(1)
    expect(inspect('const message = `${`nested ${child.kill("SIGQUIT")}`}`')).toHaveLength(1)
    expect(inspect('const message = `${/}/.test("}") ? 0 : child.kill("SIGQUIT")}`')).toHaveLength(
      1,
    )
    expect(inspect('const message = `${"child.kill(\\"SIGQUIT\\")"}`')).toEqual([])
    expect(inspect('const message = `escaped \\${child.kill("SIGQUIT")}`')).toEqual([])
    expect(() => inspect('const message = `${child.kill("SIGQUIT")}')).toThrow()
  })
  test("JSX signal API content requires review before quote tokenization", () => {
    for (const extension of ["tsx", "jsx"]) {
      const file = `tests/example.test.${extension}`
      for (const source of [
        `<div>it's {child.kill("SIGQUIT")} fine'</div>`,
        `<div>{child./* comment */kill?.("SIGQUIT")}</div>`,
        `<div>Inert example: child.kill("SIGTERM")</div>`,
      ]) {
        expect(inspect(source, file)).toMatchObject([
          { file, line: 1, reason: expect.stringContaining("manual") },
        ])
      }
      expect(inspect("<div>plain</div>", file)).toEqual([])
    }
  })
  test("division operators remain executable in JavaScript and TypeScript", () => {
    expect(inspect('const ratio = {value: 0} / child.kill("SIGQUIT") / 2')).toHaveLength(1)
    expect(inspect('const ratio = counter++ / child.kill("SIGQUIT") / 2')).toHaveLength(1)
    expect(inspect('const ratio = child! / child.kill("SIGQUIT") / 2')).toHaveLength(1)
    expect(inspect('const ratio = createBox<T> / child.kill("SIGQUIT") / 2')).toHaveLength(1)
  })
  test("inspects Python f-string expressions and direct signal APIs", () => {
    expect(
      inspect('message = f"{child.send_signal(signal.SIGQUIT)}"', "tests/helper.py"),
    ).toHaveLength(1)
    expect(
      inspect('message = f"{{child.send_signal(signal.SIGQUIT)}}"', "tests/helper.py"),
    ).toEqual([])
    expect(
      inspect('message = f"\\{child.send_signal(signal.SIGQUIT)}"', "tests/helper.py"),
    ).toHaveLength(1)
    expect(
      inspect('message = rf"\\{child.send_signal(signal.SIGQUIT)}"', "tests/helper.py"),
    ).toHaveLength(1)
    expect(inspect("count = 5 // 2; os.kill(pid, signal.SIGQUIT)", "tests/helper.py")).toHaveLength(
      1,
    )
    expect(inspect("signal.pthread_kill(0, signal.SIGQUIT)", "tests/helper.py")).toHaveLength(1)
    expect(inspect("signal.pthread_kill(0, signal.SIGTERM)", "tests/helper.py")).toEqual([])
    expect(inspect("os.abort()", "tests/helper.py")).toHaveLength(1)
    expect(inspect("child.send_signal(signal.SIGQUIT)", "tests/helper.py")).toHaveLength(1)
    expect(inspect("child.send_signal(signal.SIGTERM)", "tests/helper.py")).toEqual([])
    expect(() =>
      inspect('message = f"{child.send_signal(signal.SIGQUIT)"', "tests/helper.py"),
    ).toThrow()
  })
  test("unreadable roots fail closed", () => {
    expect(() => checkProcessTestSafety("/nonexistent/i484-safety-fixture")).toThrow()
  })
  test("usual runner refuses unsafe owned fixture before it can write a marker", () => {
    const dir = mkdtempSync(path.join(tmpdir(), "process-safety-preflight-"))
    try {
      mkdirSync(path.join(dir, "tests"))
      const marker = path.join(dir, "started")
      // Source remains inert: invoking it would create the marker before the forbidden send.
      writeFileSync(
        path.join(dir, "tests/unsafe.test.ts"),
        `import {writeFileSync} from "node:fs"; writeFileSync(${JSON.stringify(marker)}, "started"); child.kill("SIGQUIT")`,
      )
      const runner = path.resolve(import.meta.dir, "../scripts/run-tests.ts")
      const result = spawnSync(process.execPath, [runner, "tests/unsafe.test.ts"], {
        cwd: dir,
        encoding: "utf8",
      })
      expect(result.status).toBe(1)
      expect(result.stderr).toContain("Process safety preflight")
      expect(result.stderr).toContain("unsafe.test.ts")
      expect(() => readFileSync(marker)).toThrow()
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })
  test("usual runner preflights an unsafe external absolute fixture", () => {
    const dir = mkdtempSync(path.join(tmpdir(), "process-safety-root-"))
    const externalDir = mkdtempSync(path.join(tmpdir(), "process-safety-external-"))
    try {
      mkdirSync(path.join(dir, "tests"))
      const marker = path.join(externalDir, "started")
      const externalFixture = path.join(externalDir, "unsafe.test.ts")
      writeFileSync(
        externalFixture,
        `import {writeFileSync} from "node:fs"; writeFileSync(${JSON.stringify(marker)}, "started"); const message = \`\${child.kill("SIGQUIT")}\``,
      )
      const runner = path.resolve(import.meta.dir, "../scripts/run-tests.ts")
      const result = spawnSync(process.execPath, [runner, externalFixture], {
        cwd: dir,
        encoding: "utf8",
      })
      expect(result.status).toBe(1)
      expect(result.stderr).toContain("Process safety preflight")
      expect(result.stderr).toContain(path.basename(externalFixture))
      expect(() => readFileSync(marker)).toThrow()
    } finally {
      rmSync(dir, { recursive: true, force: true })
      rmSync(externalDir, { recursive: true, force: true })
    }
  })
  test("fails closed when a source under tests is a symlink", () => {
    const root = mkdtempSync(path.join(tmpdir(), "process-safety-symlink-root-"))
    const target = mkdtempSync(path.join(tmpdir(), "process-safety-symlink-target-"))
    try {
      mkdirSync(path.join(root, "tests"))
      writeFileSync(path.join(target, "safe.test.ts"), 'test("safe", () => {})')
      symlinkSync(path.join(target, "safe.test.ts"), path.join(root, "tests/safe.test.ts"), "file")
      expect(() => checkProcessTestSafety(root)).toThrow(/symlink/i)
    } finally {
      rmSync(root, { recursive: true, force: true })
      rmSync(target, { recursive: true, force: true })
    }
  })
  test("readiness scans the repo's actual current process helpers", () => {
    expect(checkProcessTestSafety(path.resolve(import.meta.dir, ".."))).toEqual([])
  })
})
