# Sources and provenance

This specialist was rebuilt from `ishibashi-c/i484-product-design` for the i484 Engineering environment.

- Source repository: https://github.com/ishibashi-c/i484-product-design
- Extraction baseline: `23de3297fc32339619f30c354206ee1199f63a2c`
- Migration rule: retain product-design knowledge and quality criteria; remove engineering orchestration owned by Compound Engineering.

The original repository contains the detailed research/source ledger used to derive the UX, accessibility, composition, content-stress, and visual-language references. Keep that ledger as the provenance source when updating these references rather than inventing new claims from this condensed file.

## External research source: Impeccable

The context-layering and surface-intent additions were informed by research into [pbakaus/impeccable](https://github.com/pbakaus/impeccable), licensed under Apache-2.0. i484 does not import Impeccable's command workflow, build phases, templates, detector implementation, or prose. The concepts are restated as i484-owned product-design knowledge under CE's existing authority model.

- Research repository: https://github.com/pbakaus/impeccable
- License observed during research: Apache-2.0
- Relevant concepts studied: separation of durable product context from design context and surface-local direction; surface-purpose-dependent design judgment.
- Excluded from migration: Impeccable command routing, approval/build state machine, browser iteration orchestration, finish-review workflow, and runtime state.
