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

## External runtime knowledge source: UI Skills

UI Skills MCP is an optional runtime registry used to fetch narrow UI specialist knowledge without vendoring its catalog into i484 Engineering.

- Registry project: https://github.com/ibelick/ui-skills
- MCP endpoint: https://www.ui-skills.com/mcp
- Registry project license observed during integration: MIT
- Runtime tools: `list_skills`, `get_skill`
- Integration rule: fetched skill content is external domain guidance, not CE workflow authority and not durable i484 source text.

The registry can surface skills from other publishers. Those fetched skills may carry licenses or provenance different from the UI Skills registry itself. Runtime consultation does not copy them into this repository. Any future durable extraction into i484 must review the specific upstream source and license separately before rewriting or incorporating material.

## External runtime audit source: Checklist Design

Checklist Design is an optional external completeness auditor for concrete screens, flows, and components. i484 Engineering does not vendor its checklist corpus.

- Skill repository: https://github.com/Checklist-Design/skills
- Product site: https://www.checklist.design
- License observed during integration: MIT
- Integration rule: use the external skill's audit mode when a concrete surface maps to a relevant checklist and omission risk matters; keep general critique and product-design judgment in i484-product-design.
- Failure rule: if the skill is unavailable or no checklist matches, continue with i484 Product Design and leave checklist-specific completeness unverified rather than blocking the engineering workflow.
