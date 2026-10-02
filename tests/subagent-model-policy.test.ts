import { describe, expect, test } from "bun:test"
import { readFile } from "fs/promises"
import path from "path"

const root = process.cwd()
const read = (file: string) => readFile(path.join(root, file), "utf8")
const owners = [
  "skills/ce-code-review/references/native-model-policy.md",
  "skills/ce-doc-review/references/native-model-policy.md",
  "skills/ce-simplify-code/references/native-model-policy.md",
  "skills/ce-plan/references/native-model-policy.md",
  "skills/ce-explain/references/native-model-policy.md",
  "skills/ce-work/references/native-model-policy.md",
]

describe("native subagent model policy", () => {
  test("policy copies are identical and contain the required decision and evidence contract", async () => {
    const copies = await Promise.all(owners.map(read))
    expect(new Set(copies).size).toBe(1)
    for (const required of [
      "scope, inputs, and authoritative acceptance criteria",
      "Critical correctness, security, adversarial analysis, architecture, full research interpretation, and final synthesis",
      "persona name alone",
      "native_subagent_models",
      "Active user and Global instructions take precedence",
      "actual dispatch arguments",
      "requested_model",
      "served_model_evidence",
      "stop the old writer before parent takeover",
      "Unknown served model alone does not justify rerunning",
      "Do not claim cost savings",
    ]) {
      expect(copies[0]).toContain(required)
    }
  })

  test("every owning skill loads its policy at the dispatch boundary", async () => {
    const files = [
      "skills/ce-code-review/references/dispatch-reviewers.md",
      "skills/ce-doc-review/references/dispatch.md",
      "skills/ce-simplify-code/SKILL.md",
      "skills/ce-plan/references/research.md",
      "skills/ce-explain/references/orchestration.md",
      "skills/ce-work/references/execution-strategy.md",
      "skills/ce-work/references/implementation-loop.md",
    ]
    for (const file of files) {
      const content = await read(file)
      expect(content).toContain("references/native-model-policy.md")
      expect(content).toMatch(/immediately before (native )?(reviewer )?dispatch/i)
    }
  })

  test("config templates are identical and document optional per-host settings", async () => {
    const [setup, example, guide] = await Promise.all([
      read("skills/ce-setup/references/config-template.yaml"),
      read(".compound-engineering/config.example.yaml"),
      read("docs/guides/configuration.md"),
    ])
    expect(setup).toBe(example)
    expect(setup).toContain("native_subagent_models:")
    expect(setup).toContain("codex:")
    expect(guide).toContain("native_subagent_models")
  })
})
