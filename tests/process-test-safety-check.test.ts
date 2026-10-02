import { describe, expect, test } from "bun:test"
import { spawnSync } from "node:child_process"
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
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
    expect(inspect("os.kill(os.getpid(), signal.SIGQUIT)", "tests/helper.py")).toHaveLength(1)
  })
  test("does not execute inert data or flag comments and quoted examples", () => {
    expect(inspect('// child.kill("SIGQUIT")\nconst example = \'child.kill("SIGQUIT")\'')).toEqual(
      [],
    )
    expect(inspect('const fixture = `process.kill(pid, "SIGQUIT")`')).toEqual([])
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
  test("unreadable roots fail closed", () => {
    expect(() => checkProcessTestSafety("/nonexistent/i484-safety-fixture")).toThrow()
  })
  test("usual runner refuses unsafe external fixture before it can write a marker", () => {
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
  test("readiness scans the repo's actual current process helpers", () => {
    expect(checkProcessTestSafety(path.resolve(import.meta.dir, ".."))).toEqual([])
  })
})
