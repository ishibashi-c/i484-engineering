import { existsSync } from "node:fs"

const SOURCE_FILE = /\.(?:[cm]?[jt]s|[jt]sx)$/
const GENERATED_FILE = /^(?:node_modules|dist|build|coverage|site\/(?:_site|vendor))\//

export function qualityFiles(base: string, cwd = process.cwd()): string[] {
  const runGit = (args: string[]) => {
    const result = Bun.spawnSync(["git", ...args], { cwd, stdout: "pipe", stderr: "pipe" })
    if (result.exitCode !== 0) {
      throw new Error(result.stderr.toString().trim() || "Git quality scope failed")
    }
    return result.stdout.toString()
  }
  // Include committed branch changes, staged/unstaged edits, and new files.
  // A missing base is an error: an empty scope must never hide a bad CI checkout.
  const ancestor = runGit(["merge-base", "HEAD", base]).trim()
  const upstreamBoundary = runGit([
    "log",
    "-1",
    "--format=%H",
    "--extended-regexp",
    "--grep=^[[:alpha:]]+\\(upstream\\):",
    `${ancestor}..HEAD`,
  ]).trim()
  const scopeBase = upstreamBoundary || ancestor
  const tracked = runGit(["diff", "--name-only", "-z", "--diff-filter=ACMR", scopeBase, "--"])
  const untracked = runGit(["ls-files", "--others", "--exclude-standard", "-z"])
  return [...new Set(`${tracked}${untracked}`.split("\0"))]
    .filter(
      (file) =>
        (file === "package.json" || file === "biome.jsonc" || SOURCE_FILE.test(file)) &&
        !file.startsWith("tests/fixtures/") &&
        !GENERATED_FILE.test(file) &&
        !file.endsWith(".min.js") &&
        existsSync(`${cwd}/${file}`),
    )
    .sort()
}

if (import.meta.main) {
  const mode = process.argv[2] ?? "check"
  if (mode !== "check" && mode !== "fix") {
    throw new Error("Quality mode must be check or fix")
  }
  const base = process.env.QUALITY_BASE || "origin/main"
  const files = qualityFiles(base)
  if (files.length === 0) {
    console.log("No changed JavaScript/TypeScript quality targets.")
  } else {
    console.log(`Ultracite ${mode}: ${files.length} changed files (base ${base})`)
    const result = Bun.spawnSync(["bun", "x", "--no-install", "ultracite", mode, ...files], {
      stdin: "inherit",
      stdout: "inherit",
      stderr: "inherit",
    })
    process.exit(result.exitCode)
  }
}
