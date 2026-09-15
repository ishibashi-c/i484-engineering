import { readFile } from "fs/promises"
import path from "path"
import { describe, expect, test } from "bun:test"

const root = process.cwd()
const repoUrl = "https://github.com/ishibashi-c/i484-engineering"

async function json(relativePath: string): Promise<any> {
  return JSON.parse(await readFile(path.join(root, relativePath), "utf8"))
}

async function text(relativePath: string): Promise<string> {
  return readFile(path.join(root, relativePath), "utf8")
}

describe("i484 Engineering distribution identity", () => {
  test("publishes the Codex marketplace and plugin as i484 Engineering", async () => {
    const marketplace = await json(".agents/plugins/marketplace.json")
    const plugin = await json(".codex-plugin/plugin.json")

    expect(marketplace.name).toBe("i484-engineering-plugin")
    expect(marketplace.interface?.displayName).toBe("i484 Engineering")
    expect(marketplace.plugins?.[0]?.name).toBe("i484-engineering")

    expect(plugin.name).toBe("i484-engineering")
    expect(plugin.interface?.displayName).toBe("i484 Engineering")
    expect(plugin.interface?.developerName).toBe("ishibashi-c")
    expect(plugin.repository).toBe(repoUrl)
    expect(plugin.interface?.websiteURL).toBe(repoUrl)
  })

  test("keeps host manifests on one public identity", async () => {
    const packageJson = await json("package.json")
    const rootPlugin = await json("plugin.json")
    const claudePlugin = await json(".claude-plugin/plugin.json")
    const claudeMarketplace = await json(".claude-plugin/marketplace.json")
    const cursorPlugin = await json(".cursor-plugin/plugin.json")
    const cursorMarketplace = await json(".cursor-plugin/marketplace.json")
    const kimiPlugin = await json(".kimi-plugin/plugin.json")
    const kimiMarketplace = await json(".kimi-plugin/marketplace.json")
    const grokPlugin = await json(".grok-plugin/plugin.json")
    const grokMarketplace = await json(".grok-plugin/marketplace.json")
    const ompMarketplace = await json(".omp-plugin/marketplace.json")
    const devinPlugin = await json(".devin-plugin/plugin.json")
    const agyPlugin = await json(".agy/plugin.json")

    for (const manifest of [
      packageJson,
      rootPlugin,
      claudePlugin,
      cursorPlugin,
      kimiPlugin,
      grokPlugin,
      devinPlugin,
      agyPlugin,
    ]) {
      expect(manifest.name).toBe("i484-engineering")
    }

    for (const manifest of [packageJson, rootPlugin, claudePlugin, cursorPlugin, grokPlugin, devinPlugin, agyPlugin]) {
      expect(manifest.repository).toBe(repoUrl)
    }

    expect(claudeMarketplace.name).toBe("i484-engineering-plugin")
    expect(claudeMarketplace.owner?.name).toBe("ishibashi-c")
    expect(claudeMarketplace.plugins?.[0]?.name).toBe("i484-engineering")

    expect(cursorMarketplace.name).toBe("i484-engineering-plugin")
    expect(cursorMarketplace.owner?.name).toBe("ishibashi-c")
    expect(cursorMarketplace.plugins?.[0]?.name).toBe("i484-engineering")

    expect(kimiMarketplace.plugins?.[0]?.id).toBe("i484-engineering")
    expect(kimiMarketplace.plugins?.[0]?.displayName).toBe("i484 Engineering")
    expect(kimiMarketplace.plugins?.[0]?.source).toBe(repoUrl)

    expect(grokMarketplace.name).toBe("i484-engineering-plugin")
    expect(grokMarketplace.owner?.name).toBe("ishibashi-c")
    expect(grokMarketplace.plugins?.[0]?.name).toBe("i484-engineering")

    expect(ompMarketplace.name).toBe("i484-engineering-plugin")
    expect(ompMarketplace.owner?.name).toBe("ishibashi-c")
    expect(ompMarketplace.plugins?.[0]?.name).toBe("i484-engineering")
  })

  test("uses i484 Engineering for public release and install identity", async () => {
    const releaseConfig = await json(".github/release-please-config.json")
    const readme = await text("README.md")
    const clineInstall = await text(".cline/INSTALL.md")

    expect(releaseConfig.packages?.["."]?.["package-name"]).toBe("i484-engineering")
    expect(readme).toContain("codex plugin add i484-engineering@i484-engineering-plugin")
    expect(clineInstall).toContain("# Installing i484 Engineering for Cline")
    expect(clineInstall).toContain("https://github.com/ishibashi-c/i484-engineering.git")
  })

  test("retains Compound Engineering provenance and CE skill names", async () => {
    const ceWork = await text("skills/ce-work/SKILL.md")
    const attribution = await text("ATTRIBUTION.md")

    expect(ceWork).toContain("name: ce-work")
    expect(attribution).toContain("EveryInc/compound-engineering-plugin")
    expect(attribution).toContain("Copyright (c) 2025 Every")
  })
})
