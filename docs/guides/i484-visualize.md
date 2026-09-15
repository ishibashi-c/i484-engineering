# i484 Visualize

`i484-visualize` is a specialist artifact skill for producing a single portable HTML explanation or structural visualization. It is not a general engineering workflow and does not own implementation planning, code review, Git, or shipping.

## What it adds

Use it when the requested deliverable itself is a self-contained HTML document that benefits from deliberate information architecture and visual explanation.

Typical outputs include:

- architecture and system diagrams
- workflow, sequence, lifecycle, and data-flow explanations
- before / delta / after comparisons
- structured technical explainers that combine text, tables, and diagrams
- interactive explanations where interaction materially improves understanding

The skill keeps the explanation structurally faithful to the source material and validates the generated HTML with its bundled validator.

## When to use it

Use it when a portable HTML artifact is the product of the task. Do not route ordinary UI implementation, normal Markdown documentation, or short inline diagrams through this skill merely because visualization is possible.

## Relationship to CE

Compound Engineering continues to own the surrounding engineering work. `i484-visualize` owns only the artifact-specific authoring contract and the checks required for that artifact to be usable.

```text
Compound Engineering -> engineering workflow, verification, review, shipping
i484-visualize       -> portable HTML explanation / visualization
```

## Source

Runtime behavior is defined in [`skills/i484-visualize/SKILL.md`](../../skills/i484-visualize/SKILL.md). Migration and authority boundaries are documented in [`I484_ENGINEERING.md`](../../I484_ENGINEERING.md).
