# Routes, server, and reporting

Read this before mapping changed files to routes (workflow step 3). It carries the route-mapping starting points, the port and server commands, what to check on each page, the two human-facing prompts, and the summary format.

## Resolve the changed surface

A route belongs to scope when the selected change can affect the application actually served. Record the selected target, comparison base, and served checkout before mapping files. Resolve the base from the PR metadata, the branch's integration target, or the repository's default branch on its tracking remote. Do not assume its name. If no reliable base exists, report the scope blocker rather than substitute a different change.

- For a PR, use its changed-file metadata and verify that the served application contains the selected head's changes. PR metadata alone does not establish what a running server renders.
- For `current` or empty input, include the branch changes from its merge base plus staged, unstaged, and relevant untracked source files in the served checkout. A clean branch diff does not exclude local UI work. Inspect untracked files before treating them as application source; exclude generated output and unrelated work.
- For a named branch, compare that branch with its resolved base without checking it out. If the server does not serve that revision, report the mismatch and what would establish it. Do not claim the named branch was tested against another checkout.

Deduplicate the file set and map shared UI dependencies to the routes that consume them. A proven absence of affected browser routes is a no-browser-change result, not a passing browser test.

## Map changed files to routes

Map each changed file to the route(s) that render it, then build the list of URLs to test. The table below is a starting point of common patterns, not an exhaustive rule set — apply judgment for the project's actual layout:

| File Pattern | Route(s) |
|-------------|----------|
| `app/views/users/*` | `/users`, `/users/:id`, `/users/new` |
| `app/controllers/settings_controller.rb` | `/settings` |
| `app/javascript/controllers/*_controller.js` | Pages using that Stimulus controller |
| `app/components/*_component.rb` | Pages rendering that component |
| `app/views/layouts/*` | All pages (test homepage at minimum) |
| `app/assets/stylesheets/*` | Visual regression on key pages |
| `app/helpers/*_helper.rb` | Pages using that helper |
| `src/app/*` (Next.js) | Corresponding routes |
| `src/components/*` | Pages using those components |

## Determine the port and verify the dev server is running

`scripts/resolve-port.sh` resolves the port and prints it alone on stdout, so the shell call that needs it captures the value instead of a later step re-typing a printed number. Append the explicit port as an argument when you have one.

```bash
SKILL_DIR="<absolute path of the directory containing the SKILL.md you just read>";
PORT=$(bash "$SKILL_DIR/scripts/resolve-port.sh");
if lsof -i ":${PORT}" -sTCP:LISTEN -t >/dev/null 2>&1; then
  echo "Server running on port ${PORT}";
else
  echo "Server not running on port ${PORT}";
  echo "Start your dev server, then re-run:";
  echo "  Rails: bin/dev  or  rails server -p ${PORT}";
  echo "  Node/Next.js: npm run dev";
  echo "  Custom port: run this skill again with --port <your-port>";
  exit 0;
fi
```

## Test each affected page

For each affected route, use the selected driver to navigate and capture fresh rendered or interactive state.

**Verify key elements:**
- Page title/heading present
- Primary content rendered
- No error messages visible
- Forms have expected fields
- No new console errors attributable to the tested flow

**Test critical interactions:** derive locators or element references from the selected driver's latest inspected state, perform the click/fill/press action, then inspect the resulting state. Do not guess selectors or reuse stale references.

**Take screenshots:** capture viewport and full-page evidence when the selected driver supports it. Materialize screenshots as local artifacts when a later workflow or report needs file paths; otherwise in-app evidence is sufficient.

## Human verification (when required)

| Flow Type | What to Ask |
|-----------|-------------|
| OAuth | "Please sign in with [provider] and confirm it works" |
| Email | "Check your inbox for the test email and confirm receipt" |
| Payments | "Complete a test purchase in sandbox mode" |
| SMS | "Verify you received the SMS code" |
| External APIs | "Confirm the [service] integration is working" |

Ask the user with the platform's question tool (the list is in SKILL.md step 6), or present numbered options and wait:

```
Human Verification Needed

This test touches [flow type]. Please:
1. [Action to take]
2. [What to verify]

Did it work correctly?
1. Yes - continue testing
2. No - describe the issue
```

## Handle failures

1. **Document the failure:**
   - Capture a screenshot of the error state with the selected driver
   - Note the exact reproduction steps

2. **Ask the user how to proceed:**

   ```
   Test Failed: [route]

   Issue: [description]
   Console errors: [if any]

   How to proceed?
   1. Fix now - debug and fix the failing test
   2. Skip - continue testing other pages
   ```

3. **If "Fix now":** use `ce-debug` for investigation and the scoped fix, then retest the failing flow with the selected browser driver. A code change alone does not replace the observed Fail.
4. **If "Skip":** retain the observed Fail and record that investigation was deferred, then continue. The choice changes the next action, not the evidence. Only a completed passing retest can replace Fail. Use Skip only when a check has no completed outcome.

Derive the overall result from evidence: any remaining Fail means FAIL; otherwise any Skip means PARTIAL; otherwise all scoped routes must have completed passing evidence for PASS. A server, scope, or revision mismatch is a blocker, never PASS.

## Test summary

```markdown
## Browser Test Results

**Test Scope:** PR #[number] / [branch name]
**Server:** http://localhost:<port>

### Pages Tested: [count]

| Route | Status | Notes |
|-------|--------|-------|
| `/users` | Pass | |
| `/settings` | Pass | |
| `/dashboard` | Fail | Console error: [msg] |
| `/checkout` | Skip | Requires payment credentials |

### Console Errors: [count]
- [List any errors found]

### Human Verifications: [count]
- OAuth flow: Confirmed
- Email delivery: Confirmed

### Failures: [count]
- `/dashboard` - [issue description]

### Result: [PASS / FAIL / PARTIAL]
```
