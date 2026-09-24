# i484 Engineering Maintainer Guide

`i484-engineering` is a derivative engineering environment built on [EveryInc/compound-engineering-plugin](https://github.com/EveryInc/compound-engineering-plugin).

This document is the **maintainer source of truth for i484-specific architecture and intentional divergence from upstream Compound Engineering (CE)**. It replaces the former standalone `MIGRATION.md` and also serves as the upstream patch registry.

## Document ownership

Keep the root documentation split by purpose:

| Document | Owns |
| --- | --- |
| [README.md](README.md) | User-facing overview, installation, skill inventory, and the high-level relationship to CE |
| [I484_ENGINEERING.md](I484_ENGINEERING.md) | Maintainer architecture, legacy migration decisions, intentional upstream differences, and upstream-sync policy |
| [ATTRIBUTION.md](ATTRIBUTION.md) | Provenance, upstream credit, extraction sources, and licensing context |
| [LICENSE](LICENSE) | License text and copyright notices |

Do not create a second migration guide or patch ledger unless this ownership model itself stops being sufficient.

## Authority model

1. **Compound Engineering owns engineering workflow.** Planning, execution strategy, debugging flow, verification, review orchestration, Git workflow, shipping, recovery, and knowledge compounding follow CE.
2. **CE wins on conflict.** If an i484 rule conflicts with, duplicates, or is likely to diverge from CE engineering behavior, adopt the current CE behavior first and remove or adapt the i484 rule.
3. **i484 specialists own domain judgment.** A specialist may define domain goals, constraints, quality criteria, relevant evidence, and safe boundaries. It must not introduce a competing engineering phase model, Git policy, review pipeline, or shipping flow.
4. **Project instructions still matter.** Project-specific product contracts, design decisions, lint commands, and active instructions remain inputs to CE and the relevant specialist skills.

In short:

```text
Compound Engineering = how engineering work is run
i484 specialists     = how a specialist domain is judged
Project context       = what this product/repository requires
```

## Specialist layer

### i484-product-design

`skills/i484-product-design` is intentionally knowledge-oriented. It retains UX heuristics, composition, interaction, accessibility, content stress, visual language, and data / visual / interaction parity while leaving implementation workflow to CE.

```text
CE decides how to implement and verify.
i484-product-design identifies what makes the product design good or bad
and which observable states matter to that judgment.
```

### i484-visualize and i484-geometric-illustration

`skills/i484-visualize` and `skills/i484-geometric-illustration` are specialist/artifact capabilities rather than engineering frameworks. Their domain-specific authoring contracts remain where sequence is intrinsic to producing and judging the artifact; planning, Git, code review, repository verification, and shipping remain with CE.

The geometric specialist keeps its runtime visual-language knowledge text-only. Larger historical style-anchor assets and detailed validation records remain in the previous repository as provenance.

### External quality providers

`natural-japanese` and Ultracite remain external quality providers rather than workflow owners.

- User-facing Japanese changes may use `natural-japanese` when it is available.
- JS/TS projects that adopt Ultracite expose it through their configured lint/check path.
- CE owns when those checks run, whether later changes require reruns, and when engineering verification is complete.

No separate i484 final-quality workflow is required.

## Legacy migration decisions

The previous i484 environment is treated as source material, not as a second framework to preserve beside CE.

| Legacy asset | Status in i484 Engineering | Decision |
| --- | --- | --- |
| `i484-workflow` | Retired from runtime architecture | CE owns engineering workflow and routing semantics. |
| `i484-review` | Not imported by default | CE review is the baseline. Reintroduce only a clearly distinct capability after a demonstrated gap. |
| `i484-product-design` | Rebuilt and embedded | Preserve design-domain knowledge; remove engineering orchestration. |
| `i484-visualize` | Rebuilt and embedded | Preserve portable-HTML and structural-visualization capability; delegate engineering flow to CE. |
| `i484-geometric-illustration` | Rebuilt and embedded | Preserve geometric visual-language and artifact-specific judgment. |
| `natural-japanese` | External provider | Language-quality specialist, not a router. |
| Ultracite | External provider | Project lint/check provider, not a second CE phase. |
| `i484-core` runtime routing | Not migrated | Do not retain a second top-level engineering authority. |
| Behavior Studio | Separate maintainer-tool evaluation | It may analyze instructions/skills, but is not part of runtime routing by default. |

### What was extracted

- **Product Design:** UX heuristics, composition, interaction/content/accessibility guidance, content stress, visual language, data / visual / interaction parity, and evidence-shaped design evaluation.
- **Visualize / Geometric Illustration:** artifact-specific authoring contracts whose sequence is intrinsic to the artifact.
- **Review:** falsification and adjudication ideas remain provenance candidates only. They are not copied into a parallel review framework.
- **Core / Workflow:** generic planning, verification, recovery, routing, integration, Git, and handoff machinery is not migrated because CE owns those concerns.

The old repositories remain provenance and research sources. They do not need to be deleted merely because the runtime cutover is complete.

## Intentional divergence from upstream CE

The registry below is the canonical inventory of **intentional i484 differences**. When a future upstream sync changes the same behavior, inspect this registry before resolving the conflict.

There are two classes:

- **Fork-owned additions** live outside CE-native behavior and are expected to remain.
- **CE-native patches** modify CE-owned runtime paths and should stay as small as possible. Each must have a reason and a retirement condition.

### Fork-owned additions

| ID | Addition | Main surfaces | Why it exists | Introduced |
| --- | --- | --- | --- | --- |
| F1 | i484 specialist layer | `skills/i484-product-design/**`, `skills/i484-visualize/**`, `skills/i484-geometric-illustration/**`, corresponding guides/tests | Adds specialist domain knowledge CE does not own without creating a second engineering workflow. | [PR #1](https://github.com/ishibashi-c/i484-engineering/pull/1) |
| F2 | i484 distribution identity | plugin/package manifests, root README, i484 identity tests, attribution/license metadata | Ships the fork as **i484 Engineering** while preserving CE-derived skill names and upstream attribution. | [PR #2](https://github.com/ishibashi-c/i484-engineering/pull/2) |

### CE-native patches

#### C1 — Specialist and quality-provider integration across CE

**Purpose:** Let CE use i484 specialist judgment at the design-bearing point of brainstorming, planning, and implementation without transferring workflow authority away from CE. Configured quality providers remain inside `ce-work`'s quality gate.

**Main surfaces:**
- `skills/ce-brainstorm/SKILL.md`
- `skills/ce-plan/SKILL.md`
- `skills/ce-work/SKILL.md`
- `skills/ce-work/references/implementation-loop.md`

**Behavior retained:**
- `ce-brainstorm` loads `i484-product-design` before design-dependent product-UI questions or requirements decisions when the specialist is available.
- `ce-plan` loads it before design-dependent UI planning decisions.
- `ce-work` loads it before relevant product-UI implementation decisions.
- The specialist contributes product/design/surface context, surface-intent, UX, composition, interaction, accessibility, content-stress, and visual-language judgment without owning CE workflow.
- Other i484 specialists remain additive and domain-scoped.
- `natural-japanese` and Ultracite may participate inside `ce-work`'s quality gate when available/applicable.

**Introduced:** [PR #1](https://github.com/ishibashi-c/i484-engineering/pull/1)

**Retire or shrink when:** upstream CE provides a generic specialist-routing and quality-provider integration contract that covers these needs without i484-specific routing.

---

#### C2 — Adaptive question batching in `ce-brainstorm`

**Purpose:** Avoid forcing one conversational turn per question when several related questions can be answered independently.

**Main surfaces:**
- `skills/ce-brainstorm/SKILL.md`
- `skills/ce-brainstorm/references/interaction-rules.md`
- `skills/ce-brainstorm/references/universal-brainstorming.md`
- `skills/ce-brainstorm/references/dialogue.md`
- `skills/ce-brainstorm/references/phase-0.md`
- `skills/ce-brainstorm/references/handoff.md`
- `docs/guides/ce-brainstorm.md`
- `tests/skills/ce-brainstorm-ask-decisions.test.ts`

**Invariant:** Batch related questions when each can be answered independently from the same context. Serialize consequential decisions and questions whose answer determines the next question. Do not bundle unrelated questions merely to reduce turns.

**Introduced:** [PR #3](https://github.com/ishibashi-c/i484-engineering/pull/3)

**Retire when:** upstream CE adopts equivalent adaptive batching semantics across the same runtime paths.

---

#### C3 — Functional UI copy baseline

**Purpose:** Prevent UI-generating paths from inventing AI-style slogans, aspirational marketing copy, poetic headings, or decorative explanatory prose when the task did not ask for brand/marketing copy.

**Main surfaces:**
- `skills/ce-prototype/references/build.md`
- `skills/ce-work/references/implementation-loop.md`
- `skills/ce-brainstorm/references/visual-probes.md`
- `tests/skills/ui-copy-baseline.test.ts`

**Invariant:** Unless the user or active project explicitly calls for brand/marketing copy, generated product UI uses literal, functional language for content, state, action, or destination. Unsettled throwaway copy prefers neutral language or an explicit placeholder over plausible-sounding marketing copy.

**Introduced:** [PR #4](https://github.com/ishibashi-c/i484-engineering/pull/4)

**Retire when:** upstream CE establishes an equivalent invariant across all relevant UI-generation entry paths.

---

#### C4 — Reviewer model down-tier ceiling

**Purpose:** Preserve CE's cost-saving reviewer tiering without allowing a lower-cost parent session to be automatically promoted to a more expensive model.

**Main surfaces:**
- `skills/ce-code-review/references/dispatch-reviewers.md`
- `tests/review-skill-contract.test.ts`

**Invariant:**
- `correctness-reviewer`, `security-reviewer`, and `adversarial-reviewer` keep the session model.
- Other local review personas may use the platform's balanced mid-tier only when it is a known **down-tier** from the session model.
- If the session model is already at or below that tier, or ordering cannot be established, inherit the session model.
- The balanced mid-tier is a cost-saving ceiling, not an upgrade target.

This specifically prevents cases such as a Luna session being promoted to Sol solely because Sol is treated as the platform's balanced mid-tier.

**Introduced:** [PR #6](https://github.com/ishibashi-c/i484-engineering/pull/6)

**Retire when:** upstream CE's reviewer model policy independently guarantees that cost-saving tiering cannot up-tier the session.

## Upstream sync history

This is a lightweight checkpoint log, not a duplicate changelog. Git history remains authoritative for individual upstream commits.

| i484 PR | Upstream checkpoint | Notes |
| --- | --- | --- |
| [PR #5](https://github.com/ishibashi-c/i484-engineering/pull/5) | CE 3.28.0 | First post-foundation upstream merge; retained i484 identity and runtime patches. |
| [PR #6](https://github.com/ishibashi-c/i484-engineering/pull/6) | CE 3.28.2 | Pulled later CE model/review updates and added C4 reviewer-model ceiling. |

Update this table only for meaningful upstream-sync PRs. Do not mirror every upstream commit here.

## Upstream update policy

Keep CE-native patch surface small enough that every divergence can be explained by the registry above.

For each upstream sync:

1. Fetch and inspect the new upstream range before changing i484 files.
2. Treat new CE engineering semantics as authoritative.
3. Check every CE-native patch whose files or behavior overlap the upstream range.
4. If upstream now solves the same problem, remove or shrink the i484 patch instead of preserving it for compatibility.
5. Reapply only still-valid, non-conflicting i484 behavior.
6. Validate CE behavior first and i484 specialist/integration contracts second.
7. Update this registry in the same PR whenever a patch is added, materially changed, retired, or absorbed upstream.
8. Inspect the resulting diff for accidental growth of CE-native patch surface.

Preferred Git shape:

```text
EveryInc/compound-engineering-plugin (upstream)
                  |
                  v
ishibashi-c/i484-engineering
                  |
                  +-- CE baseline
                  +-- small, registered CE-native patches
                  +-- i484 specialist skills
                  +-- i484-owned docs/tests
```

Use a real merge commit for upstream-sync PRs when preserving upstream ancestry materially improves the next comparison. Do not squash away upstream ancestry merely for a shorter history.

## Patch admission and retirement

A new CE-native patch should be added only when all of the following are true:

- a real i484 usage problem or requirement exists;
- the owning layer is genuinely CE-native rather than an i484 specialist;
- upstream does not already provide an equivalent behavior/configuration;
- the change can be stated as a small condition rather than a parallel workflow;
- the patch has a mechanical contract test when its invariant is greppable/deterministic, and behavioral evidence when the change depends on model judgment.

Every CE-native patch must record a **retirement condition**. Upstream convergence is a reason to delete local code, not to keep both versions.

## Local cutover contract

A machine is on the intended architecture when:

1. `i484-engineering` is the CE implementation in use.
2. CE skills such as `ce-work`, `ce-debug`, `ce-code-review`, and `ce-setup` are visible to the active harness.
3. `i484-product-design`, `i484-visualize`, and `i484-geometric-illustration` are visible from the same skill tree.
4. Active global/project instructions do not require `i484-workflow` as the entry point.
5. No second top-level i484 engineering workflow shadows CE.
6. `natural-japanese` and Ultracite may remain independently installed as quality providers.
7. CE's setup/health check passes for the active project, subject to any explicitly accepted local limitations.

The replacement global principle is intentionally small:

```text
Use Compound Engineering as the engineering workflow authority.
Choose installed specialist skills from their descriptions when their domain applies.
Do not add a second top-level workflow around CE.
```

## Quality integration principle

CE remains responsible for deciding when engineering verification is complete. Specialist skills express the quality claim and the evidence relevant to that claim, not parallel completion gates.

Examples:

- Product Design: focus, error recovery, long content, and responsive transitions are relevant observations.
- Natural Japanese: changed user-facing Japanese should be checked for naturalness and semantic accuracy.
- Ultracite: the project's configured JS/TS lint/check provider must pass.

CE owns execution, ordering, reruns after later changes, review, and shipping.

## Provenance and license

Compound Engineering remains the foundational upstream project. Its MIT license and original copyright notice are preserved in [LICENSE](LICENSE).

See [ATTRIBUTION.md](ATTRIBUTION.md) for explicit upstream credit, extraction baselines, and provenance details.
