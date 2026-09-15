import { access, readFile } from "fs/promises"
import path from "path"
import { describe, expect, test } from "bun:test"

const specialistRoots = [
  "skills/i484-product-design",
  "skills/i484-visualize",
  "skills/i484-geometric-illustration",
] as const

function localMarkdownLinks(markdown: string): string[] {
  const links = [...markdown.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)]
    .map((match) => match[1].trim())
    .filter((target) => target && !target.startsWith("#") && !/^[a-z][a-z0-9+.-]*:/i.test(target))
    .map((target) => target.split("#", 1)[0])
    .filter(Boolean)
  return [...new Set(links)]
}

describe("i484 specialist references", () => {
  test("all local links from specialist entrypoints resolve", async () => {
    for (const root of specialistRoots) {
      const skillPath = path.join(process.cwd(), root, "SKILL.md")
      const content = await readFile(skillPath, "utf8")
      for (const target of localMarkdownLinks(content)) {
        const resolved = path.resolve(path.dirname(skillPath), target)
        expect(resolved.startsWith(path.resolve(process.cwd(), root) + path.sep)).toBe(true)
        await expect(access(resolved)).resolves.toBeUndefined()
      }
    }
  })

  test("product-design references do not revive the retired engineering workflow", async () => {
    const files = [
      "design-language.md",
      "composition-components.md",
      "interaction-content-accessibility.md",
      "usability-checklist.md",
      "content-stress-and-alternatives.md",
    ]
    const combined = (
      await Promise.all(
        files.map((file) =>
          readFile(path.join(process.cwd(), "skills/i484-product-design/references", file), "utf8"),
        ),
      )
    ).join("\n")

    expect(combined).not.toContain("task plan")
    expect(combined).not.toContain("implementation contract")
    expect(combined).not.toContain("review notes")
    expect(combined).not.toContain("V-route")
    expect(combined).not.toContain("V0")
    expect(combined).not.toContain("V1")
    expect(combined).not.toContain("V2")
    expect(combined).not.toContain("V3")
    expect(combined).not.toContain("ce-code-review")
  })
})
