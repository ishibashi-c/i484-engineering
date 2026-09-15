# Attribution

## Compound Engineering

`i484-engineering` is based on and remains a GitHub fork of [EveryInc/compound-engineering-plugin](https://github.com/EveryInc/compound-engineering-plugin).

Original project:

- **Compound Engineering**
- Organization: **Every Inc.**
- Maintainers named by the upstream project: **Kieran Klaassen** and **Trevin Chow**
- Upstream contributors: the Compound Engineering open-source community
- License: **MIT License**
- Original copyright notice: `Copyright (c) 2025 Every`

The upstream MIT license and copyright notice are preserved verbatim in [`LICENSE`](LICENSE). Nothing in this fork implies endorsement by Every Inc. or the upstream maintainers.

## i484 additions

The i484-specific additions are maintained by `ishibashi-c`. They extend the CE baseline with specialist knowledge and capabilities while intentionally treating CE as the authority for engineering workflow.

The first migrated specialist, `i484-product-design`, is rebuilt from the earlier repository:

- https://github.com/ishibashi-c/i484-product-design
- extraction baseline: `23de3297fc32339619f30c354206ee1199f63a2c`

The migration retains product-design knowledge such as UX heuristics, composition, interaction, accessibility, content stress, and visual-language judgment, while removing engineering orchestration that is now owned by Compound Engineering.

Other i484 repositories may be used as source material for future specialist extraction. Their useful domain/artifact knowledge should be migrated selectively rather than treating the previous i484 architecture as a second framework.

## Design principle

Where upstream Compound Engineering and an i484 engineering rule disagree, Compound Engineering takes precedence. i484-specific behavior should remain additive, specialist, and non-conflicting.
