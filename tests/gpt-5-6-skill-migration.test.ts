import { describe, expect, test } from "bun:test"
import { readdir, readFile } from "fs/promises"
import path from "path"

const repoRoot = process.cwd()
const skillsRoot = path.join(repoRoot, "skills")

async function markdownFiles(root: string): Promise<string[]> {
  const entries = await readdir(root, { withFileTypes: true })
  const nested = await Promise.all(
    entries.map((entry) => {
      const absolute = path.join(root, entry.name)
      if (entry.isDirectory()) {
        return markdownFiles(absolute)
      }
      return entry.isFile() && entry.name.endsWith(".md") ? [absolute] : []
    }),
  )
  return nested.flat()
}

async function filesMatching(pattern: RegExp, files?: string[]): Promise<string[]> {
  const candidates = files ?? (await markdownFiles(skillsRoot))
  const matches = await Promise.all(
    candidates.map(async (file) => ((await readFile(file, "utf8")).match(pattern) ? file : null)),
  )
  return matches
    .filter((file): file is string => file !== null)
    .map((file) => path.relative(repoRoot, file))
}

function readSkill(relativePath: string): Promise<string> {
  return readFile(path.join(repoRoot, "skills", relativePath), "utf8")
}

describe("GPT-5.6 skill migration", () => {
  test("keeps runtime prompt assets free of provider-specific GPT-5.6 and GPT-6 variants", async () => {
    const promptAssets = (await markdownFiles(skillsRoot)).filter((file) =>
      /\/references\/(?:agents|personas)\//.test(file),
    )

    expect(await filesMatching(/gpt-(?:5\.6|6)-(?:sol|terra|luna|astra)/i, promptAssets)).toEqual(
      [],
    )
  })

  test("removes the obsolete Codex mini/mid-tier label", async () => {
    expect(await filesMatching(/mini\/mid-tier/i)).toEqual([])
  })

  test("does not treat Codex task wording as a model override", async () => {
    const [codeReviewSkill, codeReviewDispatch, simplifyCode] = await Promise.all([
      readSkill("ce-code-review/SKILL.md"),
      readSkill("ce-code-review/references/dispatch-reviewers.md"),
      readSkill("ce-simplify-code/SKILL.md"),
    ])
    const codeReview = `${codeReviewSkill}\n${codeReviewDispatch}`

    expect(codeReview).toContain("references/native-model-policy.md")
    expect(simplifyCode).toContain("references/native-model-policy.md")
    const policy = await readSkill("ce-code-review/references/native-model-policy.md")
    expect(policy).toContain("Prompt wording is not a model override")
    expect(policy).toContain("actual dispatch arguments")
    expect(policy).not.toContain(
      "request the host's current lower-cost supporting-agent configuration",
    )
  })

  test("does not reference the retired Codex work-delegation config", async () => {
    expect(await filesMatching(/work_delegate_/i)).toEqual([])
  })

  test("does not rely on generic prompt exhortations", async () => {
    expect(await filesMatching(/\bbe thorough\b/i)).toEqual([])
    expect(await filesMatching(/leave no stone unturned/i)).toEqual([])
    expect(await filesMatching(/last line of defense/i)).toEqual([])
  })
})
