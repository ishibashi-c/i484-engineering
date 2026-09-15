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
    expect(architecture).toContain("The previous i484 skill family is not merged into CE as a second framework")
    expect(architecture).toContain("`i484-workflow` is therefore not a required layer")
    expect(architecture).toContain("`i484-review` is not imported by default")
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
    expect(content).toContain("planning、task decomposition、実装順序")
    expect(content).toContain("branch、worktree、commit、push、PR、deploy、handoff")
    expect(content).toContain("engineering workflowの統括は現在のengineering frameworkに残す")
    expect(content).toContain("**Data parity:**")
    expect(content).toContain("**Visual parity:**")
    expect(content).toContain("**Interaction parity:**")
  })

  test("keeps artifact specialists outside general engineering authority", async () => {
    const visualize = await readRepoFile("skills/i484-visualize/SKILL.md")
    const geometric = await readRepoFile("skills/i484-geometric-illustration/SKILL.md")

    expect(visualize).toContain("このSkillはbranch、commit、PR、deploy、一般コードレビュー、engineering task decompositionを所有しない")
    expect(geometric).toContain("software engineeringのplanning、test、review orchestration、Git、PR、shippingは所有しない")
  })

  test("connects specialists without replacing ce-work", async () => {
    const ceWork = await readRepoFile("skills/ce-work/SKILL.md")

    expect(ceWork).toContain("i484 specialist knowledge is additive, never a second workflow")
    expect(ceWork).toContain("`i484-product-design`")
    expect(ceWork).toContain("i484 quality providers stay inside CE's quality gate")
    expect(ceWork).toContain("`natural-japanese`")
    expect(ceWork).toContain("Ultracite")
  })
})
