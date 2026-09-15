# Design evaluation

Use this reference when judging whether a rendered product UI supports a design claim. It defines product-design evidence and evaluation criteria, not the engineering workflow that obtains the evidence.

## Match evidence to the claim

A design claim is supported by observations that can actually falsify it.

- Visual claims require a rendered surface, not source inspection alone.
- Interaction claims require the relevant state transition, feedback, focus, validation, or recovery behavior.
- Native-host claims require the native host when host CSS, fonts, viewport, platform controls, or embedding can change the result.
- Responsive claims require the conditions where layout behavior changes, not a ritual set of named device widths.

Choose representative states by what can change the design judgment: short and long content, localized text, missing values, loading, empty, error, disabled, focus, different action counts, and layout transitions. Do not multiply examples that exercise the same design condition.

If the observation needed for a claim is unavailable, keep the claim unverified rather than inferring success from implementation intent.

## Judge repeated components as systems

A repeated component is stable only when its internal role structure survives realistic content and state variation.

When geometry matters, judge the outer item and its meaningful internal slots rather than only the card or row boundary. Relevant observations can include wrapping, alignment, baseline, minimum size, action placement, padding, gaps, and overflow under the actual font and width constraints.

For comparable action groups, preserve a predictable action structure unless the user task genuinely requires variation. Disabled, overflow-menu, or other explicit patterns can preserve comparability better than silently removing controls. Invisible placeholders can preserve geometry but do not by themselves make the visible interaction model consistent.

A page-level absence of horizontal overflow does not prove each repeated item is sound. Content and controls must remain inside their own meaningful layout boundary without clipping, overlap, or accidental spill into adjacent items.

## Separate design dimensions

Do not let success in one dimension stand in for another.

- **Functional:** the intended action or state transition can occur.
- **Visual:** hierarchy, geometry, typography, surface treatment, spacing, and responsive composition support the intended task.
- **Accessibility:** semantics, labels, focus, contrast, target size, state visibility, and relevant motion behavior remain usable.

A control that works can still be visually misleading or inaccessible. A visually polished surface can still have broken recovery or semantics.

## Review order

Prioritize findings by user consequence rather than polish visibility.

1. Meaning or task failure: hidden actions, misleading state, unreadable content, wrong order, broken recovery.
2. Product-pattern inconsistency: the same role changes hierarchy, placement, label, or behavior without a task reason.
3. Composition failure: clipping, overlap, fragile wrapping, poor measure, broken hierarchy, or misplaced actions.
4. Accessibility or interaction-feedback failure: focus, contrast, target size, state visibility, reduced-motion needs, or equivalent barriers.
5. Polish: rhythm, alignment, optical balance, typography, palette coherence, or unnecessary chrome.

Stable product patterns should change because the task, content, accessibility, or responsive behavior requires it, not merely because a different treatment is visually novel.

## Findings

A useful design finding states:

- the observable evidence;
- the user/task condition affected;
- the design relationship or product pattern that fails;
- the consequence;
- a concrete direction for correction when one is justified.

Distinguish an observed defect from a source-based risk or an untested hypothesis. Screenshots and examples are evidence, not a permanent rule store. Promote a visual relationship into project guidance only when it is durable enough to change future design decisions.
