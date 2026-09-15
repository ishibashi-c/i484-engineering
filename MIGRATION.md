# Migration to i484 Engineering

This document defines the cutover from the previous i484 environment to the CE-based `i484-engineering` environment.

The migration is intentionally **not** an in-place merge of two engineering frameworks. Establish Compound Engineering first, then add only the specialist assets that still provide distinct value.

## Legacy asset disposition

| Legacy asset | New-environment status | Reason |
| --- | --- | --- |
| `i484-workflow` | Retired from the runtime architecture | CE owns engineering workflow and routing semantics. Do not run both as competing top-level workflows. |
| `i484-review` | Not imported by default | CE review is the baseline. Reintroduce only a clearly distinct adjudication capability if real usage demonstrates a gap. |
| `i484-product-design` | Rebuilt and embedded | Keep UX, composition, interaction, accessibility, content stress, visual language, and parity judgments; remove engineering orchestration. |
| `i484-visualize` | Rebuilt and embedded | Keep portable-HTML and structural-visualization authoring; general engineering remains with CE. |
| `i484-geometric-illustration` | Rebuilt and embedded | Keep geometric visual-language and artifact-specific authoring/review; large historical style anchors stay in the source repo. |
| `natural-japanese` | External quality provider | Keep the independently installed skill; use it only when user-facing Japanese is affected. |
| `ultracite` | External lint/check provider | Keep the independently installed skill/tooling and expose it through project lint/check instructions. CE owns when verification is complete. |
| `i484-core` runtime routing | Not migrated | The old core/router model must not remain an engineering authority beside CE. Its historical tools/data can be evaluated separately as tooling, not as runtime workflow policy. |
| Behavior Studio | Separate future evaluation | It may remain useful as an instruction/skill analysis tool, but it is not required for the i484 Engineering runtime and must not become a second router. |

## Local cutover contract

A machine has completed the migration only when all of the following are true:

1. The `i484-engineering` plugin/skill tree is the CE implementation being used.
2. CE skills such as `ce-work`, `ce-debug`, `ce-code-review`, and `ce-setup` are visible to the active harness.
3. `i484-product-design`, `i484-visualize`, and `i484-geometric-illustration` are visible from the same `skills/` tree.
4. Active global or project instructions no longer require `i484-workflow` as the entry point for repository work.
5. No second top-level i484 engineering workflow is loaded to override or shadow CE.
6. `natural-japanese` and `ultracite` may remain independently installed; they are quality providers, not routers.
7. Run CE's setup/health check using the invocation appropriate to the active host (for Codex, `$ce-setup`) and resolve repo-local issues it reports.
8. Run the CE-native validation gates for this fork before treating the migration as complete: release metadata validation, plugin schema validation, and the repository test suite.

Do not delete the old i484 repositories as part of cutover. They remain provenance, research, and migration sources until the new environment has been exercised enough to decide what can be archived.

## Global instruction migration

The previous i484 Global AGENTS policy explicitly routed repository work through `i484-workflow`. That directive is incompatible with the new authority model and must not remain active after cutover.

The replacement principle is intentionally smaller:

```text
Use Compound Engineering as the engineering workflow authority.
Choose installed specialist skills from their descriptions when their domain applies.
Do not add a second top-level workflow around CE.
```

Project-specific product contracts and user preferences may remain in project/global context where appropriate, but generic planning, debugging, verification, review, Git, and shipping policy should not be copied from the retired i484 workflow into a new global wrapper.

## Quality-provider integration

Do not recreate the old final-lint chain as a separate phase.

- If user-facing Japanese changed and `natural-japanese` is available, use it as the relevant language-quality check within the CE-owned work.
- If a JS/TS project adopts Ultracite, make Ultracite the configured lint/check path that CE's quality gate runs.
- If either provider changes files, CE owns the resulting diff and the relevant checks must be valid again before shipping.

## Upstream CE updates

When EveryInc updates Compound Engineering:

1. Bring the upstream CE change into the fork.
2. Treat new CE behavior as authoritative.
3. Resolve conflicts in favor of CE engineering semantics.
4. Reapply only i484 specialist behavior that is still non-conflicting and valuable.
5. Run CE-native validation first.
6. Run i484 specialist contract/reference tests second.
7. Inspect the resulting diff for accidental growth of the CE patch surface.

Do not preserve an old i484 rule merely because it existed before the upstream update.

## Acceptance state

The target architecture is:

```text
Compound Engineering
  = engineering workflow authority

skills/i484-product-design
skills/i484-visualize
skills/i484-geometric-illustration
  = embedded specialist knowledge/capabilities

natural-japanese / ultracite
  = optional external quality providers

legacy i484 repositories
  = provenance and future extraction sources, not runtime authorities
```
