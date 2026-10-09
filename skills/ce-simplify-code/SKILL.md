---
name: ce-simplify-code
description: "Simplify settled, recently changed code for clarity, reuse, quality, and efficiency while preserving behavior. Use after implementation and before review; use ce-debug for bugs."
argument-hint: "[blank to simplify current branch changes, or describe what to simplify]"
---

Simplify settled code within the agreed scope while preserving outputs, errors, side effects, and ordering. Return the verified changes and any unresolved limits to the user or calling workflow. Readability and avoided work are the result; fewer lines or more findings are not success criteria.

**Done:** reuse, quality, and efficiency have all been examined; worthwhile behavior-preserving changes are applied within scope; required checks have passed or their failures and missing capabilities are reported; and the consumer has the result. An already sound scope completes with no changes. When another workflow invoked this skill, return to its next step in the same session without adding a shipping workflow.


## Step 1: Identify scope

Resolve the simplification scope in this order:

1. **User-named scope** is authoritative; do not widen it.
2. **Otherwise, in git**, use the current branch versus its base. Without a usable base, use staged and unstaged changes (`git diff HEAD`).
3. **Outside git or without a diff**, use files the user named or that were edited earlier in the conversation.

If none of the above produces a non-empty scope, stop and ask the user what to simplify rather than guessing. Use the host's blocking question tool already in the current tool list (match by capability, not by a host-specific name). Presence in the current tool list is proof the tool exists; never call a user-facing question tool to discover whether it exists. If a matching tool is listed but unloaded, use the host's tool-discovery primitive to load that capability — do not search for another host's tool name. Fall back to numbered options on the host's user-visible chat surface only when no such tool is in the list or a real question call errors. Never silently skip the question.

**Preflight.** If the scope has no substantive human-authored code — only documentation, generated or vendored files, dependencies or lockfiles, or mechanical churn — report that there is nothing to simplify and stop without reviewers. For mixed scopes, retain only the code. This check is about the kind of change, never its size: explicit small scopes still run, and any size or cost threshold is the caller's to set.

When the platform's task-tracking capability is available, show the review, apply, and verification outcomes without creating one task per reviewer. Otherwise continue without simulating a task list in chat.

## Step 2: Examine reuse, quality, and efficiency

All three perspectives are required; three agents are not. Read the three prompt assets below and apply their behavior-preserving criteria to the resolved scope. For a coherent local change, do this in the current context. Delegate when independent scrutiny or separable investigation can materially improve coverage. A smaller scope still receives every perspective.

- `references/personas/code-reuse-reviewer.md`
- `references/personas/code-quality-reviewer.md`
- `references/personas/efficiency-reviewer.md`

When delegating, give each reviewer the full applicable prompt asset, the resolved scope, and enough source context to judge behavior. Reviewers return findings and evidence; only the coordinator edits and verifies the integrated result. Read `references/native-model-policy.md` immediately before native dispatch and classify the task from its scope, inputs, and acceptance criteria.

Launch independent delegated work together within the host's capacity. A capacity rejection leaves that work queued until a slot is available; an unavailable dispatch runs inline with the same criteria and a disclosed substitution. Collect every launched review's terminal outcome before applying findings. Release review-owned agents when the harness provides caller-owned cleanup; never infer released capacity from completion or invent cleanup operations. Omit the dispatch `mode` parameter so the user's permission settings apply.

During longer work, report meaningful findings, unresolved limits, and the result. Do not end the turn on promised reviews or verification that have not run.

## Step 3: Fix issues

Proceed only after every required perspective has an outcome, whether produced inline or returned by a reviewer. Apply worthwhile findings directly; record false positives and low-value findings as skipped without asking the user.

Inspect beyond the resolved scope when needed to evaluate a finding, but edit only that scope and the import/export lines it needs. For a user-named file or directory scope, those import/export lines must also be inside it; skip any fix that would edit outside the mutation boundary.

Each fix must preserve outputs, errors, side effects, and ordering. If that cannot be established, skip it.

An interface or data shape that existed only in an earlier iteration of the current unshipped scope is not protected behavior once you verify it has no deployed, persisted, public, external, dependent-branch, or in-repo caller outside the resolved scope. Remove that compatibility path only when every required caller update fits the existing mutation boundary; otherwise preserve it.

**Never simplify away a safety check.** Preserve trust-boundary validation, data-loss protection, security checks, and accessibility affordances. Skip any finding that would thin or remove one.

**Honor caller-passed structure pins.** A plan path passed with the structure-pin constraint is context, not scope. Preserve its `session-settled:` Key Technical Decisions, including deliberate duplication or separation.

## Step 4: Verify behavior is preserved

Run project-wide typecheck and lint. Run tests matched to blast radius: scoped tests for local changes, broader tests for shared or wide-reach changes, and the full suite when the runner cannot scope tests.

Report failures with the check name and relevant output. Fix simplification-caused failures or revert the responsible change; never relax assertions, weaken types, or skip tests.

If no test suite, lint, or typecheck is configured, state that explicitly in the summary; do not silently skip verification.

## Step 5: Summarize

Summarize what was already sound and what improved. Report the consequential changes, skipped findings that leave a material limit, and check outcomes. If nothing changed, say so. Do not use net lines removed as the success metric.
