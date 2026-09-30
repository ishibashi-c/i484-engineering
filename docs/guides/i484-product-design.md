# i484 Product Design

`i484-product-design` is a specialist knowledge skill for judging product UI quality. It does not replace Compound Engineering's planning, implementation, verification, review, Git, or shipping workflow.

## What it adds

The skill contributes product-design judgment that a general engineering workflow should not own:

- separation of durable product truth, durable design truth, and surface-specific intent
- surface-intent judgment across persuasion, operation, comprehension, and experience
- user-task and information-hierarchy analysis
- composition and component-role decisions
- interaction, state, feedback, error prevention, and recovery
- accessibility constraints such as semantics, keyboard, focus, labels, contrast, and reduced motion
- content stress across short, long, missing, localized, loading, empty, and error states
- visual-language interpretation
- separate data, visual, and interaction parity judgments
- design-evaluation criteria that tie claims to observable rendered states, repeated-component stability, and user-impact-first findings

The usability checklist is selective rather than procedural, but it is no longer optional when the change can affect task comprehension, action, state, or recovery. In those UX-bearing cases the skill reads the reference, selects only the heuristics that can change the task outcome, and ties them to affected controls/states and observable evidence. Purely presentational changes do not trigger the read.

For concrete screens, flows, and components, Checklist Design may add a separate completeness audit. It answers a different question: whether expected category-specific elements or states are missing. General critique remains owned by i484 Product Design; Checklist Design critique is not the default review path.

The design-evaluation reference preserves useful visual-QA knowledge without reviving the old V0–V3 workflow or taking ownership of browser/test sequencing.

## When to use it

Use it when work changes or evaluates a user-facing product interface and the difficult question is what makes the design understandable, usable, accessible, or visually coherent.

Do not use it to decide engineering phases, test volume, reviewer activation, branch strategy, commits, or shipping. Compound Engineering and active project instructions own those decisions.

## Relationship to CE

`ce-brainstorm`, `ce-plan`, `ce-prototype`, `ce-work`, and `ce-polish` may load this skill as additive domain knowledge when their work reaches product-UI design decisions. CE continues to own dialogue, planning, prototyping, execution, user-directed polish scope, evidence strategy, verification, review, and shipping as applicable to each skill.

```text
Compound Engineering -> engineering workflow and lifecycle authority
i484-product-design  -> product-design judgment and quality criteria
```

The skill may identify which states or observations matter to a design claim, but it does not create a second completion gate.

## UI Skills MCP

UI Skills MCP is an optional external knowledge registry, not another workflow layer. When i484's built-in product-design knowledge and the specialist guidance already present in the run are insufficient for a material UI decision, `i484-product-design` may query the registry for one narrow, directly relevant skill.

- Endpoint: `https://www.ui-skills.com/mcp`
- Codex packaging: i484 Engineering ships a `.mcp.json` connection definition referenced by `.codex-plugin/plugin.json`; it does not vendor registry content.
- Discovery: `list_skills` with an optional narrow `query`
- Retrieval: `get_skill` by discovery name, slug, or pathSlug

Fetched skills contribute only domain knowledge relevant to the current decision. Their install/init/build/review/routing/Git/shipping procedures do not replace CE or active project instructions. The registry is not queried for routine UI decisions that i484 can already judge, and `ui-skills-root` is not used as a second router.

If the MCP is unavailable or no useful match exists, product-design judgment continues from i484 and project context rather than blocking the task. Fetched skill text is not persisted into i484 automatically; durable knowledge extraction is a separate provenance/license-reviewed change.

## Source

Runtime behavior is defined in [`skills/i484-product-design/SKILL.md`](../../skills/i484-product-design/SKILL.md). The specialist was rebuilt from the earlier i484 Product Design work after removing its engineering-orchestration layer; see [`I484_ENGINEERING.md`](../../I484_ENGINEERING.md).

## Checklist Design completeness audit

Checklist Design is an optional external auditor, not a second product-design framework.

- Upstream skill: `Checklist-Design/skills`
- Default use: `audit` only, when a concrete screen / flow / component maps directly to a published checklist and omission risk matters.
- Default non-use: general critique, early open-ended design exploration, or surfaces that do not map cleanly to a checklist.
- Failure behavior: if the skill is unavailable or no checklist matches, continue from i484 Product Design and treat checklist-specific completeness as unverified.

The external skill is not vendored into i484 Engineering, so its checklist corpus can continue to update independently. Install it in the active agent environment when you want this audit path available.
