import { readFileSync } from "fs"
import path from "path"
import { describe, expect, test } from "bun:test"

const RUNTIME_PATHS = [
  "skills/ce-prototype/references/build.md",
  "skills/ce-work/references/implementation-loop.md",
  "skills/ce-brainstorm/references/visual-probes.md",
]

describe("UI copy baseline", () => {
  test("every UI-generating runtime path rejects invented marketing copy", () => {
    for (const relativePath of RUNTIME_PATHS) {
      const body = readFileSync(path.join(process.cwd(), relativePath), "utf8")

      expect(body, relativePath).toContain("UI copy baseline")
      expect(body, relativePath).toContain("brand or marketing copy")
      expect(body, relativePath).toContain("marketing-style taglines")
      expect(body, relativePath).toContain("aspirational slogans")
      expect(body, relativePath).toContain("literal, functional product language")
      expect(body, relativePath).toContain("content, state, action, or destination")
      expect(body, relativePath).toContain("explicit placeholder")
    }
  })
})
