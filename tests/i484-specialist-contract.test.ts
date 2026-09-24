import { readFile } from "fs/promises"
import path from "path"
import { describe, expect, test } from "bun:test"

async function readRepoFile(relativePath: string): Promise<string> {
  return readFile(path.join(process.cwd(), relativePath), "utf8")
}

const specialists = [
  "i484-product-design",
  "i484-visualize",
  "i484-geometric-illustration",
] as const

describe("i484 Engineering specialist contract", () => {
  test("keeps Compound Engineering as engineering authority", async () => {
    const architecture = await readRepoFile("I484_ENGINEERING.md")

    expect(architecture).toContain("Compound Engineering owns engineering workflow")
    expect(architecture).toContain("CE wins on conflict")
    expect(architecture).toContain("The previous i484 environment is treated as source material")
    expect(architecture).toContain("`i484-workflow`")
    expect(architecture).toContain("Retired from runtime architecture")
    expect(architecture).toContain("`i484-review`")
    expect(architecture).toContain("Not imported by default")
  })

  test("preserves explicit upstream attribution and MIT notice", async () => {
    const attribution = await readRepoFile("ATTRIBUTION.md")
    const license = await readRepoFile("LICENSE")

    expect(attribution).toContain("EveryInc/compound-engineering-plugin")
    expect(attribution).toContain("Every Inc.")
    expect(attribution).toContain("Kieran Klaassen")
    expect(attribution).toContain("Trevin Chow")
    expect(attribution).toContain("MIT License")
    expect(license).toContain("Copyright (c) 2025 Every")
  })

  test("ships each i484 specialist through the normal skills catalog", async () => {
    for (const specialist of specialists) {
      const content = await readRepoFile(`skills/${specialist}/SKILL.md`)
      expect(content).toContain(`name: ${specialist}`)
      expect(content).toMatch(/^---[\s\S]*?description:/)
    }
  })

  test("keeps product design knowledge-only", async () => {
    const content = await readRepoFile("skills/i484-product-design/SKILL.md")

    expect(content).toContain("プロダクトUIについて、**何を良い設計と判断するか**を支える")
    expect(content).toContain("Planning、task decomposition、実装順序")
    expect(content).toContain("branch / worktree / commit / PR / deploy / shipping")
    expect(content).toContain("engineering workflowの統括はCEに残す")
    expect(content).toContain("durableなproduct truth")
    expect(content).toContain("surface intent")
    expect(content).toContain("context-surface-intent.md")
    expect(content).toContain("**Data parity:**")
    expect(content).toContain("**Visual parity:**")
    expect(content).toContain("**Interaction parity:**")
    expect(content).not.toContain("V0 / V1 / V2 / V3")
  })

  test("keeps artifact specialists outside general engineering authority", async () => {
    const visualize = await readRepoFile("skills/i484-visualize/SKILL.md")
    const geometric = await readRepoFile("skills/i484-geometric-illustration/SKILL.md")

    expect(visualize).toContain("このSkillはbranch、commit、PR、deploy、一般コードレビュー、engineering task decompositionを所有しない")
    expect(geometric).toContain("software engineeringのplanning、test、review orchestration、Git、PR、shippingは所有しない")
  })

  test("routes product-design knowledge through CE without transferring authority", async () => {
    const [brainstorm, plan, prototype, polish, work] = await Promise.all([
      readRepoFile("skills/ce-brainstorm/SKILL.md"),
      readRepoFile("skills/ce-plan/SKILL.md"),
      readRepoFile("skills/ce-prototype/SKILL.md"),
      readRepoFile("skills/ce-polish/SKILL.md"),
      readRepoFile("skills/ce-work/SKILL.md"),
    ])

    expect(brainstorm).toContain("i484 product-design knowledge is additive, never a second brainstorm workflow")
    expect(brainstorm).toContain("`i484-product-design`")
    expect(brainstorm).toContain("design-dependent questions")

    expect(plan).toContain("i484 product-design knowledge is additive, never a second planning workflow")
    expect(plan).toContain("`i484-product-design`")
    expect(plan).toContain("design-dependent planning decisions")

    expect(prototype).toContain("i484 product-design knowledge is additive, never a second prototype workflow")
    expect(prototype).toContain("`i484-product-design`")
    expect(prototype).toContain("product-design domain knowledge")

    expect(polish).toContain("`i484-product-design`")
    expect(polish).toContain("does not authorize a broader audit")

    expect(work).toContain("i484 specialist knowledge is additive, never a second workflow")
    expect(work).toContain("`i484-product-design`")
    expect(work).toContain("i484 quality providers stay inside CE's quality gate")
    expect(work).toContain("`natural-japanese`")
    expect(work).toContain("Ultracite")
  })

  test("keeps context and surface intent as design knowledge rather than workflow", async () => {
    const context = await readRepoFile(
      "skills/i484-product-design/references/context-surface-intent.md",
    )
    const sources = await readRepoFile("skills/i484-product-design/references/sources.md")

    expect(context).toContain("Product truth")
    expect(context).toContain("Design truth")
    expect(context).toContain("Surface intent")
    expect(context).toContain("**Persuasion:**")
    expect(context).toContain("**Operation:**")
    expect(context).toContain("**Comprehension:**")
    expect(context).toContain("**Experience:**")
    expect(context).toContain("engineering framework")
    expect(sources).toContain("pbakaus/impeccable")
    expect(sources).toContain("Apache-2.0")
    expect(sources).toContain("does not import Impeccable's command workflow")
  })
})
