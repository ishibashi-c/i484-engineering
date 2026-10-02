import { describe, expect, test } from "bun:test"
import { access, readFile } from "node:fs/promises"
import { getLegacyPluginArtifacts } from "../src/data/plugin-legacy-artifacts"

const read = (file: string) => readFile(file, "utf8")
const root = "skills/i484-style/"

describe("i484-style runtime contract", () => {
  test("ships one entry with three conditional domains and no retired entries", async () => {
    const body = await read(`${root}SKILL.md`)
    expect(body).toContain("name: i484-style")
    for (const domain of ["product-ui", "communication", "illustration"]) {
      expect(body).toContain(`references/${domain}/contract.md`)
      await access(`${root}references/${domain}/contract.md`)
    }
    for (const old of ["i484-product-design", "i484-visualize", "i484-geometric-illustration"]) {
      await expect(access(`skills/${old}/SKILL.md`)).rejects.toThrow()
      expect(getLegacyPluginArtifacts("i484-engineering").skills).toContain(old)
    }
    expect(body).toContain("全領域の資料を一括で読まない")
  })

  test("preserves CE authority and explicit application boundaries", async () => {
    const [body, architecture] = await Promise.all([
      read(`${root}SKILL.md`),
      read("I484_ENGINEERING.md"),
    ])
    expect(architecture).toContain("Compound Engineering owns engineering workflow")
    expect(architecture).toContain("CE wins on conflict")
    expect(body).toContain("工程の統括はCE")
    expect(body).toContain("新規UI・説明資料には自動適用")
    expect(body).toContain("幾何学表現が指定された場合だけ")
    expect(body).toContain("既存ブランド")
    expect(body).toContain("全面的な再デザイン")
    expect(body).toContain("未確認")
    expect(body).toContain("ユーザーの採用判断")
  })

  test("preserves upstream attribution and specialist provenance", async () => {
    const [attribution, license, sources] = await Promise.all([
      read("ATTRIBUTION.md"),
      read("LICENSE"),
      read(`${root}references/product-ui/sources.md`),
    ])
    expect(attribution).toContain("EveryInc/compound-engineering-plugin")
    expect(license).toContain("Copyright (c) 2025 Every")
    expect(sources).toContain("23de3297fc32339619f30c354206ee1199f63a2c")
    expect(sources).toContain("Apache-2.0")
    expect(sources).toContain("does not import Impeccable's command workflow")
  })

  test("keeps interaction-dependent UX reads and bounded external knowledge", async () => {
    const [body, ui, external, completeness, mcp, plugin] = await Promise.all([
      read(`${root}SKILL.md`),
      read(`${root}references/product-ui/contract.md`),
      read(`${root}references/product-ui/external-ui-knowledge.md`),
      read(`${root}references/product-ui/completeness-audit.md`),
      read(".mcp.json"),
      read(".codex-plugin/plugin.json"),
    ])
    expect(body).toContain("references/product-ui/usability-checklist.md")
    expect(ui).toContain("設計判断の前に")
    expect(ui).toContain("純粋な見た目だけの変更")
    expect(ui).toContain("usability-checklist.md")
    expect(ui).toContain("**Data parity:**")
    expect(ui).toContain("**Visual parity:**")
    expect(ui).toContain("**Interaction parity:**")
    expect(external).toContain("`ui-skills-root`をi484のrouterとして使ったりしない")
    expect(external).toContain("自動的に保存・コピーしない")
    expect(completeness).toContain("**critique** は既定では使わない")
    expect(completeness).toContain("blockしない")
    expect(JSON.parse(mcp).mcpServers.ui_skills.url).toBe("https://www.ui-skills.com/mcp")
    expect(plugin).toContain('"mcpServers": "./.mcp.json"')
  })

  test("keeps independent HTML and image evidence contracts", async () => {
    const [html, image, review, language] = await Promise.all([
      read(`${root}references/communication/contract.md`),
      read(`${root}references/illustration/contract.md`),
      read(`${root}references/illustration/visual-review.md`),
      read(`${root}references/illustration/visual-language.md`),
    ])
    expect(html).toContain('node "$SKILL_DIR/scripts/validate-html.mjs"')
    expect(html).toContain("rendererの代替ではない")
    expect(image).toContain("標準画像生成")
    expect(review).toContain("style reference")
    expect(review).toContain("subject reference")
    expect(language).toContain("style reference")
    expect(image).toContain("実画像")
  })

  test("updates CE acting-point routing and the external Japanese provider", async () => {
    for (const file of [
      "skills/ce-brainstorm/references/interaction-rules.md",
      "skills/ce-plan/references/intake.md",
      "skills/ce-prototype/references/build.md",
      "skills/ce-work/references/implementation-loop.md",
    ]) {
      const body = await read(file)
      expect(body).toContain("installed skill catalog exposes `i484-style`")
      expect(body).toContain("product-ui")
      expect(body).toContain("still owns")
      expect(body).not.toContain("`i484-product-design`")
    }
    const shipping = await read("skills/ce-work/references/shipping-workflow.md")
    expect(shipping).toContain("`yomiyasu`")
    expect(shipping).not.toContain("natural-japanese")
    expect(shipping).toContain("without creating a parallel finalization phase")
    expect(shipping).toContain("must pass the relevant CE verification before shipping")
  })
})
