# Interactive explanation pattern

Use this pattern when a static page cannot make a sequence, data handoff, permission boundary, or competing boundary easy to inspect. Keep the explanation the source of truth; interaction changes which already-written state is visible.

## Recipe

1. State the question and the reader's decision. Name the subject, audience, and conclusion before choosing controls.
2. Write a numbered path of 3–6 steps. Each step has an actor, input, action, output, and permission or ownership boundary. The visible step text remains complete when scripts are unavailable.
3. Add a step-through control with a real button, a visible current-step label, `aria-live="polite"`, and keyboard focus. Previous/next controls must disable at the ends.
4. Add a boundary toggle only when two legitimate interpretations are being compared. Label both options with their consequence, and keep the current/alternative distinction in prose and in the diagram or table.
5. Expose assumptions that change the explanation. Use a disclosure or checkbox for each assumption and describe exactly which step or conclusion it changes. Do not turn unknown quantities into made-up scores or percentages.
6. Link evidence beside the claim it supports. Use links to repository code, a specification, or an observation, and label each source type. A link is evidence navigation, not proof that the page fetched anything.
7. Finish with unresolved observations and a non-interactive reading order. The file must still communicate actors, data, permissions, boundaries, assumptions, and evidence when opened with scripts disabled.

The smallest useful data model is an array of step records (`actor`, `input`, `action`, `output`, `permission`, `evidence`). Render the same record into the step card and the accessible table so the interactive view cannot silently invent a second account.

## Portable implementation

Use inline CSS and inline JavaScript only. Do not make a display dependency on a CDN, external script, font, image, iframe, or runtime service. Keep reference links as ordinary anchors. `scripts/validate-html.mjs` can check the portable shell and accessible SVG contract; interaction, focus, and layout claims still require actual rendering when those claims matter.
