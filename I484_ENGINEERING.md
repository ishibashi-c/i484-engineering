# i484 Engineering

`i484-engineering` is a derivative engineering environment built on [EveryInc/compound-engineering-plugin](https://github.com/EveryInc/compound-engineering-plugin).

The repository remains a GitHub fork of Compound Engineering so upstream history and updates stay explicit. Compound Engineering is the engineering baseline; i484 adds specialist knowledge and capabilities that do not replace CE's engineering semantics.

## Authority model

1. **Compound Engineering owns engineering workflow.** Planning, execution strategy, debugging flow, verification, review orchestration, Git workflow, shipping, recovery, and knowledge compounding follow CE.
2. **CE wins on conflict.** If an i484 rule conflicts with, duplicates, or is likely to diverge from CE engineering behavior, remove or adapt the i484 rule rather than maintaining two authorities.
3. **i484 specialists own domain judgment.** A specialist may define domain goals, constraints, quality criteria, relevant evidence, and safe boundaries. It must not introduce a competing engineering phase model, Git policy, review pipeline, or shipping flow.
4. **Project instructions still matter.** Project-specific product contracts, design decisions, lint commands, and active instructions remain inputs to CE and the relevant specialist skills.

In short:

```text
Compound Engineering = how engineering work is run
i484 specialists    = how a specialist domain is judged
Project context      = what this product/repository requires
```

## Migration rule

The previous i484 skill family is not merged into CE as a second framework. Treat the old repositories as source material and re-extract only the parts that still add value after CE is established.

For each old i484 asset:

- engineering orchestration -> do not migrate; CE owns it
- domain knowledge / quality criteria -> migrate when it adds distinct value
- artifact-specific capability -> migrate when its own authoring contract is useful
- personal or project preference -> keep outside generic engineering semantics
- duplicated CE behavior -> delete rather than preserve for compatibility

`i484-workflow` is therefore not a required layer in this environment. `i484-review` is not imported by default; CE review is the baseline and any future adjudication capability must justify itself as a distinct specialist rather than a parallel review framework.

## Specialist layer

### i484-product-design

The embedded `skills/i484-product-design` is intentionally knowledge-only. It retains the strongest parts of the previous skill — UX heuristics, composition, interaction, accessibility, content stress, visual language, and data/visual/interaction parity — while removing V-level routing, task phases, reviewer activation, test sequencing, Git, and shipping ownership.

The boundary is:

```text
CE decides how to implement and verify.
i484-product-design identifies what makes the product design good or bad,
and which observable states matter to that judgment.
```

### i484-visualize and i484-geometric-illustration

`skills/i484-visualize` and `skills/i484-geometric-illustration` are embedded specialist/artifact capabilities, not engineering frameworks. Their domain-specific authoring contracts remain where sequence is intrinsic to producing and evaluating the artifact, while general planning, Git, code review, verification orchestration, and shipping remain with CE.

The geometric specialist keeps its runtime visual-language knowledge text-only; the previous repository remains the provenance home for the larger style-anchor image assets and detailed validation records.

### External quality providers

`natural-japanese` and `ultracite` are quality specialists/providers rather than workflow owners and are not copied into this fork:

- user-facing Japanese changes may use `natural-japanese` when that skill is available in the active environment;
- JavaScript/TypeScript projects that adopt Ultracite should expose it through the project's configured lint/check instructions, which CE's quality gates already honor.

No separate i484 “final lint phase” is required.

## Upstream update policy

Keep upstream CE changes easy to merge.

- Keep CE-native files as close to upstream as practical.
- Prefer adding specialist skills and i484-owned docs over rewriting CE-native skills.
- Make any necessary CE patch small and behavior-specific.
- Do not translate upstream CE source files in place; generated/localized documentation should remain separate from the upstream source of truth.
- When upstream and i484 modify the same behavior, adopt the new CE behavior first, then reapply only the still-valid non-conflicting i484 addition.
- After an upstream merge, validate CE behavior first and specialist integration second.

Recommended Git model:

```text
EveryInc/compound-engineering-plugin (upstream)
                  |
                  v
ishibashi-c/i484-engineering (fork)
                  |
                  +-- CE baseline
                  +-- i484 specialist skills
                  +-- i484-specific documentation / evaluation
```

## Quality integration

CE remains responsible for deciding when engineering verification is complete. Specialist skills should express the quality claim and the evidence relevant to that claim, not create parallel completion gates.

Examples:

- Product Design: “focus, error recovery, long content, and responsive transition are relevant observations.”
- Natural Japanese: “this user-facing Japanese wording should be reviewed for naturalness and semantic accuracy.”
- Ultracite: “this project's configured JS/TS lint provider must pass.”

CE then owns the execution, ordering, reruns after later changes, review, and shipping decision.

## Provenance and license

Compound Engineering remains the foundational upstream project. Its original MIT license and copyright notice are preserved in [`LICENSE`](LICENSE). See [`ATTRIBUTION.md`](ATTRIBUTION.md) for explicit project credit and i484 provenance.
