import { afterEach, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, symlinkSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { delimiter, dirname, join } from "node:path"
import { qualityFiles } from "../scripts/quality"

const roots: string[] = []
afterEach(() => {
  for (const root of roots.splice(0)) {
    rmSync(root, { recursive: true, force: true })
  }
})

function fixture() {
  const root = mkdtempSync(join(tmpdir(), "i484-quality-"))
  roots.push(root)
  const git = (...args: string[]) => {
    const result = Bun.spawnSync(["git", ...args], { cwd: root })
    if (result.exitCode !== 0) {
      throw new Error(result.stderr.toString())
    }
  }
  const write = (file: string, content = "export const value = 1\n") => {
    const target = join(root, file)
    mkdirSync(join(target, ".."), { recursive: true })
    writeFileSync(target, content)
  }
  git("init", "-q")
  git("config", "user.name", "Quality Fixture")
  git("config", "user.email", "fixture@example.invalid")
  write("src/old.ts")
  write("src/deleted.ts")
  git("add", ".")
  git("commit", "-qm", "base")
  git("branch", "baseline")
  return { root, git, write }
}

test("quality scope covers branch, staged, unstaged and untracked source, excluding fixtures/deletions", () => {
  const { root, git, write } = fixture()
  write("src/committed.ts")
  git("add", ".")
  git("commit", "-qm", "change")
  write("src/staged.ts")
  git("add", "src/staged.ts")
  write("src/old.ts", "export const value = 2\n")
  write("src/new file.ts")
  write("scripts/new.mjs")
  write("src/component.tsx")
  write(".pi/extensions/new.ts")
  write(".opencode/plugin/new.ts")
  write("skills/example/scripts/tool.mjs")
  write("site/assets/custom.js")
  write("standalone.ts")
  write("dist/generated.ts")
  write("site/vendor/library.js")
  write("site/assets/library.min.js")
  write("tests/fixtures/intentional.ts", "invalid fixture")
  write("README.md", "doc")
  rmSync(join(root, "src/deleted.ts"))
  expect(qualityFiles("baseline", root)).toEqual([
    ".opencode/plugin/new.ts",
    ".pi/extensions/new.ts",
    "scripts/new.mjs",
    "site/assets/custom.js",
    "skills/example/scripts/tool.mjs",
    "src/committed.ts",
    "src/component.tsx",
    "src/new file.ts",
    "src/old.ts",
    "src/staged.ts",
    "standalone.ts",
  ])
})

test("clean scope is empty but unknown base fails closed", () => {
  const { root } = fixture()
  expect(qualityFiles("baseline", root)).toEqual([])
  expect(() => qualityFiles("missing-base", root)).toThrow()
})

function runQuality(root: string) {
  return Bun.spawnSync(
    [process.execPath, join(import.meta.dir, "../scripts/quality.ts"), "check"],
    {
      cwd: root,
      env: {
        ...process.env,
        QUALITY_BASE: "baseline",
        PATH: `${dirname(process.execPath)}${delimiter}${process.env.PATH ?? ""}`,
      },
      stdout: "pipe",
      stderr: "pipe",
    },
  )
}

test("public quality command exits successfully for a clean scope", () => {
  const { root } = fixture()
  const result = runQuality(root)
  expect(result.exitCode).toBe(0)
  expect(result.stdout.toString()).toContain("No changed JavaScript/TypeScript quality targets")
})

test("public quality command returns the provider failure for invalid skill JavaScript", () => {
  const { root, write } = fixture()
  symlinkSync(join(import.meta.dir, "../node_modules"), join(root, "node_modules"), "junction")
  write("biome.jsonc", '{"extends":["ultracite/biome/core"]}\n')
  write("skills/example/scripts/bad.js", "export const =\n")
  const result = runQuality(root)
  expect(result.exitCode).toBe(1)
  expect(result.stdout.toString()).toContain("Ultracite check")
  expect(`${result.stdout}${result.stderr}`).toContain("skills/example/scripts/bad.js")
})
