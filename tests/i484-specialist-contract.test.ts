import { describe, expect, test } from "bun:test"
import { readFile } from "fs/promises"
import path from "path"

async function readRepoFile(relativePath: string): Promise<string> {
  return await readFile(path.join(process.cwd(), relativePath), "utf8")
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
    expect(content).toContain("external-ui-knowledge.md")
    expect(content).toContain("completeness-audit.md")
    expect(content).toContain("### UX coverage")
    expect(content).toContain("### Completeness coverage")
    expect(content).toContain("**Data parity:**")
    expect(content).toContain("**Visual parity:**")
    expect(content).toContain("**Interaction parity:**")
    expect(content).not.toContain("V0 / V1 / V2 / V3")
  })

  test("uses UI Skills MCP only as a bounded external knowledge fallback", async () => {
    const [product, external, sources, architecture, codexPlugin, mcpConfig] = await Promise.all([
      readRepoFile("skills/i484-product-design/SKILL.md"),
      readRepoFile("skills/i484-product-design/references/external-ui-knowledge.md"),
      readRepoFile("skills/i484-product-design/references/sources.md"),
      readRepoFile("I484_ENGINEERING.md"),
      readRepoFile(".codex-plugin/plugin.json"),
      readRepoFile(".mcp.json"),
    ])

    expect(product).toContain("UI Skills MCP")
    expect(product).toContain("外部registryは常時検索せず")
    expect(external).toContain("https://www.ui-skills.com/mcp")
    expect(external).toContain("`list_skills`")
    expect(external).toContain("`get_skill`")
    expect(external).toContain("`ui-skills-root`をi484のrouterとして使ったりしない")
    expect(external).toContain("workflow authorityではない")
    expect(external).toContain("blockせず")
    expect(external).toContain("自動的に保存・コピーしない")
    expect(sources).toContain("ibelick/ui-skills")
    expect(sources).toContain("other publishers")
    expect(architecture).toContain("External specialist knowledge registry")
    expect(architecture).toContain("Do not use `ui-skills-root` as a second routing layer")
    expect(codexPlugin).toContain('"mcpServers": "./.mcp.json"')
    const mcp = JSON.parse(mcpConfig)
    expect(mcp.mcpServers.ui_skills).toEqual({
      type: "http",
      url: "https://www.ui-skills.com/mcp",
    })
  })

  test("requires UX coverage when product interaction can change and keeps Checklist Design audit-scoped", async () => {
    const [product, usability, completeness, sources] = await Promise.all([
      readRepoFile("skills/i484-product-design/SKILL.md"),
      readRepoFile("skills/i484-product-design/references/usability-checklist.md"),
      readRepoFile("skills/i484-product-design/references/completeness-audit.md"),
      readRepoFile("skills/i484-product-design/references/sources.md"),
    ])

    expect(product).toContain("設計判断の前に`usability-checklist.md`を読む")
    expect(product).toContain("純粋な見た目だけの変更では、このreadを要求しない")
    expect(usability).toContain("任意の参考一覧ではなく")
    expect(usability).toContain("task / control / state")
    expect(completeness).toContain("外部Skill `checklist-design`")
    expect(completeness).toContain("**audit**")
    expect(completeness).toContain("**critique** は既定では使わない")
    expect(completeness).toContain("blockしない")
    expect(sources).toContain("Checklist-Design/skills")
    expect(sources).toContain("MIT")
  })

  test("keeps artifact specialists outside general engineering authority", async () => {
    const visualize = await readRepoFile("skills/i484-visualize/SKILL.md")
    const geometric = await readRepoFile("skills/i484-geometric-illustration/SKILL.md")

    expect(visualize).toContain(
      "このSkillはbranch、commit、PR、deploy、一般コードレビュー、engineering task decompositionを所有しない",
    )
    expect(geometric).toContain(
      "software engineeringのplanning、test、review orchestration、Git、PR、shippingは所有しない",
    )
  })

  test("routes product-design knowledge through CE without transferring authority", async () => {
    const [
      brainstorm,
      plan,
      prototype,
      polish,
      work,
      brainstormRules,
      planIntake,
      prototypeBuild,
      implementationLoop,
      shipping,
    ] = await Promise.all([
      readRepoFile("skills/ce-brainstorm/SKILL.md"),
      readRepoFile("skills/ce-plan/SKILL.md"),
      readRepoFile("skills/ce-prototype/SKILL.md"),
      readRepoFile("skills/ce-polish/SKILL.md"),
      readRepoFile("skills/ce-work/SKILL.md"),
      readRepoFile("skills/ce-brainstorm/references/interaction-rules.md"),
      readRepoFile("skills/ce-plan/references/intake.md"),
      readRepoFile("skills/ce-prototype/references/build.md"),
      readRepoFile("skills/ce-work/references/implementation-loop.md"),
      readRepoFile("skills/ce-work/references/shipping-workflow.md"),
    ])

    expect(brainstorm).toContain(
      "i484 product-design knowledge is additive, never a second brainstorm workflow",
    )
    expect(brainstorm).toContain("`i484-product-design`")
    expect(brainstorm).toContain("design-dependent questions")

    expect(plan).toContain(
      "i484 product-design knowledge is additive, never a second planning workflow",
    )
    expect(plan).toContain("`i484-product-design`")
    expect(plan).toContain("design-dependent planning decisions")

    expect(prototype).toContain(
      "i484 product-design knowledge is additive, never a second prototype workflow",
    )
    expect(prototype).toContain("`i484-product-design`")
    expect(prototype).toContain("product-design domain knowledge")

    expect(polish).toContain("`i484-product-design`")
    expect(polish).toContain("does not authorize a broader audit")

    expect(work).toContain("i484 specialist knowledge is additive, never a second workflow")
    expect(work).toContain("`i484-product-design`")
    expect(work).toContain("i484 quality providers stay inside CE's quality gate")
    expect(work).toContain("`natural-japanese`")
    expect(work).toContain("Ultracite")

    // The kernel retains authority and acting-point reads; required owners carry
    // the conditional catalog check and domain policy after the size restructure.
    expect(brainstorm).toContain(
      "Read `references/interaction-rules.md` before design-dependent questions",
    )
    expect(plan).toContain("Read `references/intake.md` before design-dependent planning decisions")
    expect(prototype).toContain(
      "Read `references/build.md` and `references/preview.md` before writing anything",
    )
    expect(work).toContain(
      "Before the first implementation write, including on the Trivial route, read `references/implementation-loop.md`",
    )
    expect(work).toContain(
      "standalone mode reads `references/shipping-workflow.md` before any quality check or delivery",
    )
    for (const owner of [brainstormRules, planIntake, prototypeBuild, implementationLoop]) {
      expect(owner).toContain("installed skill catalog exposes `i484-product-design`")
    }
    expect(brainstormRules).toContain(
      "load it before asking or resolving design-dependent questions",
    )
    expect(brainstormRules).toContain(
      "still owns dialogue, requirements scoping, artifact decisions, and handoff",
    )
    expect(planIntake).toContain("load it before making design-dependent planning decisions")
    expect(planIntake).toContain(
      "still owns technical planning, evidence gathering, plan structure, document review, and handoff",
    )
    expect(prototypeBuild).toContain("load it before making the relevant design judgments")
    expect(prototypeBuild).toContain(
      "still owns prototype scope, build/preview mechanics, user evaluation, decision capture, and handoff",
    )
    expect(implementationLoop).toContain(
      "load it for product-design judgment before making the relevant UI decisions",
    )
    expect(implementationLoop).toContain(
      "still owns task execution, evidence strategy, verification, commits, review, and shipping",
    )
    expect(shipping).toContain("without creating a parallel finalization phase")
    expect(shipping).toContain("must pass the relevant CE verification before shipping")
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
