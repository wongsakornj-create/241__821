# GitHub Copilot / Agent Instructions

## Purpose
Short, actionable guidance so an AI coding agent can be immediately productive in this repo (static HTML + JS learning/demo project).

## Big picture
- This is a simple static site with all client code under `Js/` and a couple of root HTML files (`index.html`, `index2.html`).
- No build system, no package managers: edits are small and verified by opening the files in a browser or running the JS with Node.
- `Kanit/OFL.txt` is a font license file — do not remove it if fixing fonts.

## Key files and where to look
- `Js/main.js` — primary JS file, contains examples, exercises and several runtime bugs; first place to look for logic fixes.
- `Js/index.html` — page that includes `main.js`. Open in browser or serve locally to verify changes.
- Root `index.html` and `index2.html` — alternate pages; check them when editing markup or global assets.

## Project-specific conventions & patterns
- Code is demo/learning-focused and uses `console.log` extensively to show outputs — keep this pattern when adding small tests/examples.
- Comments contain both English and Thai explanations; when changing code, add an English summary comment to make intent clear to other contributors.
- No test framework exists; small, self-checking snippets (console outputs) are the accepted verification method.

## Common, repeatable issues to fix (examples from `Js/main.js`)
- Runtime errors from wrong/undefined identifiers:
  - Example: `let hight = 5.9` but later `console.log("Height:", height)` — rename to a single consistent identifier (`height`).
  - Example: `if (A >= 80)` when the file uses `score` — use `score` in comparisons: `if (score >= 80) ...`.
- Duplicate `let` declarations in the same scope (causes SyntaxError in modern JS). Instead, reuse variables or rename them.
- Mismatched variable names and logging variables (e.g., `condition` vs `condition1`) — ensure the logged variable exists.
- Ordering and ranges for grade checks: use descending checks (>=80, >=70, ...) against the same `score` variable.

## How to verify changes locally
- Fast browser check: open `Js/index.html` in Chrome/Edge and use DevTools Console to inspect runtime logs/errors. (On Windows: right-click > Open with > choose browser.)
- Quick server: install an HTTP server if needed, e.g. `npx http-server .` or use the VS Code Live Server extension to serve files with a proper origin.
- Node check (for pure JS logic snippets): run `node Js/main.js` — useful for surfacing SyntaxError or reference errors without a browser.

## Safe edit rules for agents
- Do not change the site structure or remove files unless explicitly asked.
- Keep changes small and well-scoped (1 logical change per PR) and include a short verification note (how to run and what to expect in Console).
- When fixing logic: add or update a short comment (English) explaining the fix and a brief console output test so reviewers can easily confirm behavior.

## Example fix (what we expect an agent to produce)
- Buggy grade check before:

  ```js
  let score = 75;
  if (A >= 80) { ... } else if (B >= 70) { ... }
  ```

- Correct approach:

  ```js
  let score = 75;
  if (score >= 80) {
    console.log('Grade A');
  } else if (score >= 70) {
    console.log('Grade B');
  }
  ```

Include a one-line test in the file (`console.log('grade check:', expected)`) to demonstrate the fix.

## PR & commit guidance
- Make small, focused commits with descriptive messages (e.g., `fix: correct grade logic in Js/main.js`).
- In the PR description include:
  - Files changed
  - How to verify (browser + console steps or `node` commands)
  - If the change fixes a bug, include the failing console output and the expected output after the fix

## When unclear or risky
- If a change could alter user-visible behavior (UI text, layout, or fonts), ask for confirmation via a comment on the PR before merging.
- If a bug suggests a larger refactor (e.g., tests needed, adding a bundler), open an issue and propose the minimal plan rather than making the large change unasked.

---

If any of these bullets are incomplete or you'd like additional examples (e.g., preferred commit message format or adding a simple test runner), tell me which area to expand. ✅
