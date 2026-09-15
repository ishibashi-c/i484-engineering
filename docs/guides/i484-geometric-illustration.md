# i484 Geometric Illustration

`i484-geometric-illustration` is a specialist visual-language skill for creating restrained geometric raster illustrations with a repeatable i484 style vocabulary. It does not own general software-engineering workflow.

## What it adds

The skill carries domain knowledge for:

- translating source subjects into geometric planes, blocks, lines, overlaps, and negative space
- preserving a restrained editorial composition instead of drifting into generic vector art
- controlling palette, hierarchy, depth, crop, and visual rhythm
- keeping a coherent series language across multiple illustrations
- reviewing the result against explicit visual-language criteria

The style knowledge is text-first in this repository so upstream CE remains easy to sync. Larger historical style-anchor assets and old validation material remain provenance sources rather than runtime dependencies.

## When to use it

Use it when the requested visual should intentionally follow the i484 geometric-illustration language. Do not use it as a generic image-generation wrapper or as a substitute for `i484-product-design` when the task is primarily product UI.

## Relationship to CE

Compound Engineering owns planning, execution strategy, verification orchestration, review, Git, and shipping. This skill owns only the illustration-specific authoring and judgment contract.

```text
Compound Engineering            -> engineering workflow
i484-geometric-illustration     -> geometric visual-language judgment
```

When an illustration is part of a product UI, `i484-product-design` can define the illustration's role, placement, crop, and relationship to the interface while this skill handles the visual artifact itself.

## Source

Runtime behavior is defined in [`skills/i484-geometric-illustration/SKILL.md`](../../skills/i484-geometric-illustration/SKILL.md). Migration and provenance are documented in [`I484_ENGINEERING.md`](../../I484_ENGINEERING.md) and [`ATTRIBUTION.md`](../../ATTRIBUTION.md).
