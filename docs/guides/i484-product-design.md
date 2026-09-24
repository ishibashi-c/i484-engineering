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

The usability checklist is selective rather than procedural: it chooses the heuristics that matter to the current user task and affected controls instead of forcing a fixed checklist pass. The design-evaluation reference preserves useful visual-QA knowledge without reviving the old V0–V3 workflow or taking ownership of browser/test sequencing.

## When to use it

Use it when work changes or evaluates a user-facing product interface and the difficult question is what makes the design understandable, usable, accessible, or visually coherent.

Do not use it to decide engineering phases, test volume, reviewer activation, branch strategy, commits, or shipping. Compound Engineering and active project instructions own those decisions.

## Relationship to CE

`ce-brainstorm`, `ce-plan`, and `ce-work` may load this skill as additive domain knowledge when their work reaches product-UI design decisions. CE continues to own dialogue/planning/execution, evidence strategy, verification, review, and shipping as applicable to each skill.

```text
Compound Engineering -> engineering workflow and lifecycle authority
i484-product-design  -> product-design judgment and quality criteria
```

The skill may identify which states or observations matter to a design claim, but it does not create a second completion gate.

## Source

Runtime behavior is defined in [`skills/i484-product-design/SKILL.md`](../../skills/i484-product-design/SKILL.md). The specialist was rebuilt from the earlier i484 Product Design work after removing its engineering-orchestration layer; see [`I484_ENGINEERING.md`](../../I484_ENGINEERING.md).
