import { access, readdir, readFile } from "fs/promises"
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

async function markdownFiles(root: string): Promise<string[]> {
  const entries = await readdir(root, { withFileTypes: true })
  const files: string[] = []
  for (const entry of entries) {
    const full = path.join(root, entry.name)
    if (entry.isDirectory()) files.push(...(await markdownFiles(full)))
    else if (entry.isFile() && entry.name.endsWith(".md")) files.push(full)
  }
  return files
}

describe("i484 specialist references", () => {
  test("all local Markdown links inside specialist packages resolve", async () => {
    for (const relativeRoot of specialistRoots) {
      const root = path.resolve(process.cwd(), relativeRoot)
      for (const markdownPath of await markdownFiles(root)) {
        const content = await readFile(markdownPath, "utf8")
        for (const target of localMarkdownLinks(content)) {
          const resolved = path.resolve(path.dirname(markdownPath), target)
          expect(resolved.startsWith(root + path.sep)).toBe(true)
          await expect(access(resolved)).resolves.toBeUndefined()
        }
      }
    }
  })

  test("product-design references do not revive the retired engineering workflow", async () => {
    const files = [
      "context-surface-intent.md",
      "design-language.md",
      "composition-components.md",
      "interaction-content-accessibility.md",
      "usability-checklist.md",
      "content-stress-and-alternatives.md",
      "design-evaluation.md",
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
