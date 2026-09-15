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

The first specialist extraction set comes from these earlier i484 repositories:

- [`i484-product-design`](https://github.com/ishibashi-c/i484-product-design) — extraction baseline `23de3297fc32339619f30c354206ee1199f63a2c`
- [`i484-visualize`](https://github.com/ishibashi-c/i484-visualize) — extraction baseline `89ac9c97c567c75d131d91f42594abefda1cd39a`
- [`i484-geometric-illustration`](https://github.com/ishibashi-c/i484-geometric-illustration) — extraction baseline `2991c30a6744d57ebb9510b6e4634325645bbfe5`

The migration intentionally does not preserve the previous i484 architecture as a second engineering framework:

- Product Design retains UX heuristics, composition, interaction, accessibility, content stress, visual-language judgment, and data / visual / interaction parity while removing engineering orchestration.
- Visualize retains portable-HTML authoring, structural visualization, accessibility, and artifact-specific validation while delegating general engineering flow to CE.
- Geometric Illustration retains its visual language, prompt contract, artifact-specific review, and bounded image-authoring loop. Large style-anchor binaries and detailed historical validation remain in the original repository as provenance rather than being duplicated into this fork.

`natural-japanese` and `ultracite` are independently installed quality providers in the active environment; their contents are not copied into this repository. i484 Engineering integrates them through CE's existing quality workflow when they are available and applicable.

## Design principle

Where upstream Compound Engineering and an i484 engineering rule disagree, Compound Engineering takes precedence. i484-specific behavior should remain additive, specialist, and non-conflicting.
