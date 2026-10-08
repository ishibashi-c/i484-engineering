# i484 Engineering Maintainer Guide

`i484-engineering` is a derivative engineering environment built on [EveryInc/compound-engineering-plugin](https://github.com/EveryInc/compound-engineering-plugin).

This document is the **maintainer source of truth for i484-specific architecture and intentional divergence from upstream Compound Engineering (CE)**. It replaces the former standalone `MIGRATION.md` and also serves as the upstream patch registry.

## Document ownership

Keep the root documentation split by purpose:

| Document | Owns |
| --- | --- |
| [README.md](README.md) | User-facing overview, installation, per-skill adoption expectations and activation boundaries, and the high-level relationship to CE |
| [docs/guides/personal-environment.md](docs/guides/personal-environment.md) | Adopted external environment, purposes, activation conditions, boundaries, and setup handoff |
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

### i484-style

`skills/i484-style` is the single specialist entry. Shared preferences live in the same package, with conditional product-ui, communication, and illustration references. CE owns engineering; the specialist supplies design judgment and artifact-specific contracts.

New UI and explanatory materials apply the preferences automatically. Explicit requests and existing brand contracts take precedence. Incremental edits stay within the requested scope. Geometric illustration is opt-in; an unspecified image request does not select that visual language.

Preserve the portable HTML contract, interaction-dependent UX reads, actual artifact evidence, input-image roles, and user ownership of preference approval. Read only the relevant domain. Do not concatenate all references or launch a second engineering workflow. The geometric direction remains text-only; historical source repositories provide provenance rather than present execution evidence.

### External specialist knowledge registry

UI Skills MCP is optional external knowledge infrastructure for `i484-style`, not a workflow or router owned by i484.

- Endpoint: `https://www.ui-skills.com/mcp`
- Codex packaging: `.codex-plugin/plugin.json` points to `./.mcp.json`, which declares the remote `ui_skills` HTTP server. This packages the connection, not the registry content.
- Capabilities: `list_skills` for narrow discovery and `get_skill` for retrieval.
- Query only when i484's built-in design knowledge and specialist guidance already present in the run are insufficient for a material UI decision.
- Treat fetched skills as domain guidance only. CE and active project instructions continue to own workflow, tool execution, review, Git, and shipping.
- Do not use `ui-skills-root` as a second routing layer.
- Do not vendor fetched skill text automatically. Durable extraction is a separate provenance/license-reviewed change.

Individual registry entries may come from third-party publishers with their own licenses. The registry connection therefore does not make fetched content part of i484 Engineering.

### External completeness auditor

Checklist Design is an optional external auditor for concrete screens, flows, and components.

- Upstream: `Checklist-Design/skills`
- Use its audit mode only when the surface maps directly to a known checklist and omission risk can affect task completion, safety, or recovery.
- General product-design critique remains owned by `i484-style`; Checklist Design critique is not a default routing target.
- The skill and checklist corpus are not vendored into i484 Engineering.
- If unavailable or unmatched, engineering continues and checklist-specific completeness remains unverified.

### External quality providers

`yomiyasu` and Ultracite remain external quality providers rather than workflow owners.

- User-facing Japanese changes may use `yomiyasu` when it is available.
- JS/TS projects that adopt Ultracite expose it through their configured lint/check path.
- CE owns when those checks run, whether later changes require reruns, and when engineering verification is complete.

No separate i484 final-quality workflow is required.

## Legacy migration decisions

The previous i484 environment is treated as source material, not as a second framework to preserve beside CE.

| Legacy asset | Status in i484 Engineering | Decision |
| --- | --- | --- |
| `i484-workflow` | Retired from runtime architecture | CE owns engineering workflow and routing semantics. |
| `i484-review` | Not imported by default | CE review is the baseline. Reintroduce only a clearly distinct capability after a demonstrated gap. |
| `i484-product-design` | Consolidated into i484-style / product-ui | Preserve design-domain knowledge; remove engineering orchestration. |
| `i484-visualize` | Consolidated into i484-style / communication | Preserve portable-HTML and structural-visualization capability; delegate engineering flow to CE. |
| `i484-geometric-illustration` | Consolidated into i484-style / illustration | Preserve geometric visual-language and artifact-specific judgment. |
| `yomiyasu` | External provider | Language-quality specialist, not a router. |
| Ultracite | External provider | Project lint/check provider, not a second CE phase. |
| `i484-core` runtime routing | Not migrated | Do not retain a second top-level engineering authority. |
| Behavior Studio | Retired | Maintain the README adoption inventory when adding, removing, or changing an environment capability; no replacement routing or inventory application. |

### What was extracted

- **Product Design:** UX heuristics, composition, interaction/content/accessibility guidance, content stress, visual language, data / visual / interaction parity, and evidence-shaped design evaluation.
- **Visualize / Geometric Illustration:** artifact-specific authoring contracts whose sequence is intrinsic to the artifact.
- **Review:** falsification and adjudication ideas remain provenance candidates only. They are not copied into a parallel review framework.
- **Core / Workflow:** generic planning, verification, recovery, routing, integration, Git, and handoff machinery is not migrated because CE owns those concerns.

Retired workflow-era runtime tooling and obsolete evaluations are not current acceptance evidence and may be removed as an explicitly scoped maintenance change. Preserve original attribution, license notices, extraction sources needed by current specialists, and the upstream patch registry.

## README maintenance replaces Behavior Studio

The public README records the expected outcome and activation boundary for every shipped skill. A local environment README records external skills, plugins, and MCP connections, including why each is present and how overlaps are resolved. Additions, removals, and responsibility changes update their corresponding row in the same change. Installed or registered capabilities must not be reported as used or verified without execution evidence.

CE remains the default owner for implementation, debugging, code review, and browser verification. Generic review/debug/QA skills are explicit-request alternatives or narrow knowledge providers; do not stack their full workflows onto CE. `i484-style` supplies normal product-UI judgment. Official Product Design skills may handle image-based alternatives, remixing, and implementing a selected image or URL when that specific deliverable is requested; they do not replace CE's repository verification or delivery.

README maintenance is documentation, not another workflow or runtime router. Historical model-dependent measurements do not establish the performance of the current environment.

## Intentional divergence from upstream CE

The registry below is the canonical inventory of **intentional i484 differences**. When a future upstream sync changes the same behavior, inspect this registry before resolving the conflict.

There are two classes:

- **Fork-owned additions** live outside CE-native behavior and are expected to remain.
- **CE-native patches** modify CE-owned runtime paths and should stay as small as possible. Each must have a reason and a retirement condition.

### Fork-owned additions

| ID | Addition | Main surfaces | Why it exists | Introduced |
| --- | --- | --- | --- | --- |
| F1 | i484 specialist layer | `skills/i484-style/**`, corresponding guides/tests | Adds specialist domain knowledge CE does not own without creating a second engineering workflow. | [PR #1](https://github.com/ishibashi-c/i484-engineering/pull/1) |
| F2 | i484 distribution identity | plugin/package manifests, root README, i484 identity tests, attribution/license metadata | Ships the fork as **i484 Engineering** while preserving CE-derived skill names and upstream attribution. | [PR #2](https://github.com/ishibashi-c/i484-engineering/pull/2) |
| F3 | UI Skills MCP knowledge fallback | `skills/i484-style/references/product-ui/**`, `.codex-plugin/plugin.json`, `.mcp.json`, product-design guide, README, specialist contract tests | Supplies narrow external UI specialist knowledge on demand without vendoring the catalog or adding a second router/workflow. Codex packages the remote MCP connection definition with the plugin. | [PR #11](https://github.com/ishibashi-c/i484-engineering/pull/11) |
| F4 | Risk-triggered UX coverage + Checklist Design completeness audit | `skills/i484-style/references/product-ui/**`, product-design guide, README, specialist contract/eval tests | Makes UX heuristics a required read when interaction/state/recovery can change, while routing concrete category completeness to the external Checklist Design audit without transferring general critique or workflow authority. | [PR #13](https://github.com/ishibashi-c/i484-engineering/pull/13) |

### CE-native patches

#### C1 — Specialist and quality-provider integration across CE

**Purpose:** Let CE use i484 specialist judgment at design-bearing points without transferring workflow authority away from CE. Configured quality providers remain inside `ce-work`'s quality gate.

**Main surfaces:**
- `skills/ce-brainstorm/SKILL.md`
- `skills/ce-plan/SKILL.md`
- `skills/ce-prototype/SKILL.md`
- `skills/ce-polish/SKILL.md`
- `skills/ce-work/SKILL.md`

**Behavior retained:**
- `ce-brainstorm` loads `i484-style` before design-dependent product-UI questions or requirements decisions when the specialist is available.
- `ce-plan` loads it before design-dependent UI planning decisions.
- `ce-prototype` loads it when a prototype is settling product-UI behavior, feel, or reading experience.
- `ce-polish` loads it for requested product-UI refinement without expanding the user-directed scope.
- `ce-work` loads it before relevant product-UI implementation decisions.
- The specialist contributes product/design/surface context, surface-intent, UX, composition, interaction, accessibility, content-stress, and visual-language judgment without owning CE workflow.
- The communication and illustration domains remain additive and artifact-scoped.
- `yomiyasu` and Ultracite may participate inside `ce-work`'s quality gate when available/applicable.

**Introduced:** [PR #1](https://github.com/ishibashi-c/i484-engineering/pull/1)

**Expanded:** [PR #8](https://github.com/ishibashi-c/i484-engineering/pull/8) extends product-design routing to `ce-brainstorm`, `ce-plan`, `ce-prototype`, and `ce-polish` while keeping CE as workflow owner.

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

#### C4 — Reviewer model down-tier ceiling (absorbed into C5)

**Status:** No longer an independent runtime patch. C5's shared native-model policy now enforces the same parent-capability ceiling for reviewer and other bounded native dispatches.

**Invariant retained through C5:**
- Critical correctness, security, and adversarial reviewer roles inherit the parent model.
- A configured bounded-job model is used only when the host supports it and it is known to be at or below the parent's capability.
- Unknown model ordering, hierarchy, or support inherits the parent rather than risking an up-tier.
- The parent model remains the capability ceiling, preventing a Luna session from being promoted to Sol by supporting work.

**Current surfaces:**
- `skills/*/references/native-model-policy.md` for CE skills that dispatch bounded native jobs
- `tests/subagent-model-policy.test.ts`

**Introduced:** [PR #6](https://github.com/ishibashi-c/i484-engineering/pull/6)

**Absorbed into C5 when:** bounded native delegation generalized the same no-up-tier rule beyond review personas. Keep this historical entry so old sync decisions remain legible; retire it entirely if C5 itself is retired because upstream guarantees an equivalent parent-capability ceiling.

#### C5 — Process-test safety and bounded native delegation

**Purpose:** Prevent the known macOS crash-notification path in intentional process tests and let bounded delegated work use a configured native model without weakening critical review.

**Main surfaces:**
- `tests/helpers/process-safety.ts` and `tests/process-safety.test.ts`
- `scripts/check-process-test-safety.ts` and `scripts/run-tests.ts`
- `skills/ce-code-review/references/native-model-policy.md`
- `skills/ce-doc-review/references/native-model-policy.md`
- `skills/ce-explain/references/native-model-policy.md`
- `skills/ce-plan/references/native-model-policy.md`
- `skills/ce-simplify-code/references/native-model-policy.md`
- `skills/ce-work/references/native-model-policy.md`

**Behavior retained:**
- The common test helper skips Darwin crash-producing and unknown signals with a reason; current safe Darwin checks and existing Linux `SIGQUIT` checks remain explicit. The preflight scans repository TypeScript, JavaScript, and Python tests plus explicit file arguments before workers start. Its documented static-analysis limits remain in force.
- The dispatching CE Skill classifies each task. A bounded task with settled inputs and acceptance criteria may request the configured native model through actual launch arguments. Critical correctness, security, adversarial, architecture, full research interpretation, and final synthesis inherit the parent. Explicit execution engines and review targets remain in control.
- Receipts separate requested model and effort from served-model evidence, outcome, validation, and fallback reason. Unknown served-model identity alone does not trigger a rerun, and cost savings require measured evidence.

**Retire or shrink when:** upstream CE provides equivalent native delegation policy and process-test safety without the i484-specific constraints.

#### C6 — Host-native prototype annotation preference

**Purpose:** Avoid running CE's own annotation overlay and blocking wait loop when the active host already provides page-targeted annotations for the same local preview.

**Main surfaces:**
- `skills/ce-prototype/SKILL.md`
- `skills/ce-prototype/references/preview.md`
- `skills/ce-prototype/references/annotation-loop.md`
- `docs/guides/ce-prototype.md`
- `tests/skills/ce-prototype-protocol.test.ts`
- `tests/skill-eval-cell/catalog.ts`

**Invariant:**
- If the active host can attach feedback to the rendered local page and deliver it back to the current conversation, use that native annotation channel and start the CE preview helper without `--annotate`.
- The Codex app built-in browser satisfies that condition when its Annotation mode is available in the current run.
- If no usable native channel exists, preserve CE's annotation overlay and `annotation-loop.md` wait path as the fallback.
- This patch changes routing only; it does not remove or fork the shared `light-webserver.js` annotation implementation.

**Introduced:** [PR #23](https://github.com/ishibashi-c/i484-engineering/pull/23)

**Retire when:** upstream CE prefers a usable host-native annotation channel before starting its own annotation overlay, with an equivalent fallback when native annotations are unavailable.

#### C7 — Project-local prototype workspace

**Purpose:** Keep durable `ce-prototype` artifacts in a tool-neutral project location that multiple coding-agent harnesses using the same checkout can discover and edit directly.

**Main surfaces:**
- `skills/ce-prototype/SKILL.md`
- `skills/ce-prototype/references/build.md`
- `skills/ce-prototype/references/preview.md`
- `docs/guides/ce-prototype.md`
- `tests/skills/ce-prototype-protocol.test.ts`
- `tests/skills/ce-prototype-run-root-executes.test.ts`

**Invariant:**
- A kept isolated prototype defaults to `<repo>/prototypes/<date>-<slug>/`, alongside its `decisions.md` capsule.
- `/prototypes/` stays gitignored and uncommitted; the directory is a shared local work artifact, not production code or a CE-owned namespace.
- Another agent using the same checkout can address the prototype through the stable project-relative path.
- If the user declines the ignore entry, asks not to keep the run in the repo, no Git repository exists, or the project-local path fails its safety checks, preserve CE's private OS-temp fallback at `/tmp/compound-engineering-<uid>/ce-prototype/`.
- The repo-local path is validated for symlink, ownership, and writability without changing permissions on an existing project-owned `prototypes/` directory.

**Introduced:** [PR #26](https://github.com/ishibashi-c/i484-engineering/pull/26)

**Retire or shrink when:** upstream CE provides a configurable or tool-neutral project-local durable prototype root with equivalent gitignore, safety, and OS-temp fallback semantics.

## Upstream sync history

This is a lightweight checkpoint log, not a duplicate changelog. Git history remains authoritative for individual upstream commits.

| i484 PR | Upstream checkpoint | Notes |
| --- | --- | --- |
| [PR #5](https://github.com/ishibashi-c/i484-engineering/pull/5) | CE 3.28.0 | First post-foundation upstream merge; retained i484 identity and runtime patches. |
| [PR #6](https://github.com/ishibashi-c/i484-engineering/pull/6) | CE 3.28.2 | Pulled later CE model/review updates and added C4 reviewer-model ceiling. |
| [PR #10](https://github.com/ishibashi-c/i484-engineering/pull/10) | CE 3.29.0 | Merged upstream live-polish, learning-retirement, review/testing, cross-model, retune, and CI updates; retained registered F1/F2 and C1-C4 behavior. |
| [PR #11](https://github.com/ishibashi-c/i484-engineering/pull/11) | CE 3.30.1 | Merged upstream test-runner, plan/review/optimize, model-normalization, and workflow updates; retained C1-C4 and added F3 UI Skills MCP knowledge fallback. |
| [PR #26](https://github.com/ishibashi-c/i484-engineering/pull/26) | CE 3.30.3 | Merged planning/work/test-loop/resolver/typecheck/model-pin updates, retained i484 identity and C1-C6 behavior, absorbed C4 into C5, and added C7 project-local prototype workspace. |
| [PR #27](https://github.com/ishibashi-c/i484-engineering/pull/27) | CE 3.30.4, through `67035e9` | Integrated seven upstream commits including acpx-backed peer transport, chained-unit inline semantics, prototype annotation persistence, and review standards split. Preserved fork distribution version 3.31.1, i484 specialist integration and C1–C7; no registered patch was fully superseded. Replaced obsolete pre-acpx POV route fixtures with upstream acpx-contract tests. |

Update this table only for meaningful upstream-sync PRs. Do not mirror every upstream commit here.

### 2026-10-08 overlap adjudication

- **C1/C3:** Upstream refactored `ce-work/references/implementation-loop.md` into a dependency-ordered checklist. The i484 specialist entry, native delegation reference, and functional UI-copy baseline remain as small additive constraints in that new structure; do not restore the superseded task-loop wording.
- **C5:** The upstream pinned `acpx` transport replaces older cross-model peer scripts and corresponding fixture assumptions. Keep the independently scoped native-model ceiling and Darwin-safe process-test helpers. For the changed POV route tests, prefer upstream's `SIGTERM`/`SIGINT` process-group assertions over obsolete direct-signal fixtures.
- **C6/C7:** Variant-scoped annotation persistence is complementary to host-native annotation preference and the project-local `prototypes/` workspace, not a replacement for either. Retain both patches and their existing contracts.
- **F2:** Upstream CE's 3.30.4 release numbers must not downgrade i484 distribution manifests already at 3.31.1. Maintain fork names, URLs and version alignment while importing CE runtime additions.
- **Review/test coverage:** Adopt `CODING_STANDARDS.md` ownership and the new acpx tests; retain i484 additions in the skill-eval catalog and local CI quality gates.

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
9. On an upstream-sync PR, Ultracite begins after the latest `(upstream)`-scoped sync commit so imported upstream files are not restyled into fork-only divergence; i484 reconciliation and feature commits after that boundary remain in the quality scope.

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
3. `i484-style` is visible from the skill tree; the three retired entries are absent.
4. Active global/project instructions do not require `i484-workflow` as the entry point.
5. No second top-level i484 engineering workflow shadows CE.
6. `yomiyasu` and Ultracite may remain independently installed as quality providers.
7. CE's setup/health check passes for the active project, subject to any explicitly accepted local limitations.

UI Skills MCP is optional. Connecting or disconnecting it does not determine whether the core i484 Engineering cutover is valid.

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
- yomiyasu: changed user-facing Japanese should be checked for naturalness and semantic accuracy.
- Ultracite: the project's configured JS/TS lint/check provider must pass.

CE owns execution, ordering, reruns after later changes, review, and shipping.

## Provenance and license

Compound Engineering remains the foundational upstream project. Its MIT license and original copyright notice are preserved in [LICENSE](LICENSE).

See [ATTRIBUTION.md](ATTRIBUTION.md) for explicit upstream credit, extraction baselines, and provenance details.

## i484-style consolidation

The 2026-10-02 consolidation replaces the three public specialist entries with `i484-style`. Domain sources preserve the original extraction baselines and license context. Existing UX and artifact contracts remain explicit; duplicate observation prose and repeated shared preference descriptions are removed. A priority rule based on user impact replaces fixed ordering of issue categories. Subject/edit image preservation is distinguished from style-reference copying.

The target is Luna 6. Official model guidance supports conditional loading but does not prove output quality or token savings. Mechanical tests protect packaging, references, domain boundaries, and ownership-safe legacy cleanup. Runtime evals require fresh current-source contexts. The deleted entries have pinned historical description fingerprints so same-named independent user skills survive cleanup.

Runtime callers, both cleanup registries, README counts, guides, and the eval catalog change together. Release-owned versions remain the release automation's responsibility. Global and host observations are updated separately on this machine; a repository update does not silently synchronize every PC.
