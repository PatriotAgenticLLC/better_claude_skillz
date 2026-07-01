# `/lazy` -- Minimal-Code Discipline

Makes Claude write the least code that fully works -- applying a YAGNI/stdlib-first decision ladder before generating anything, so you get fewer moving parts, shorter diffs, and less to maintain.

## Usage

```
/lazy [full|lite|ultra|off|review|audit]
```

- `full` (default) -- apply the ladder strictly to code written this turn
- `lite` -- build as asked, add a one-line lazier-alternative note
- `ultra` -- YAGNI extremist: challenge whether the thing should exist at all
- `off` -- stop applying the discipline for the session
- `review` -- flag over-engineering in the current diff (report only)
- `audit` -- scan a repo/path for needless complexity (suggest-only)

## Features

- Six-rung decision ladder (exists-at-all? -> stdlib -> native -> existing dep -> one line -> minimum) that stops at the first rung that satisfies the need
- Hard non-negotiables that laziness never touches: input validation, error handling, security controls, accessibility, and tests/coverage
- Suggest-only mode for existing/legacy code -- never auto-deletes working code; ranks findings as `remove` / `optimize-in-place` / `keep` with rationale, risk, and an exact diff
- `lazy:` shortcut comments that record each intentional trade-off and its upgrade path
- Composes with your existing rules (immutability, small files, TDD gates) -- the stricter rule always wins
- Structured report format for `review` and `audit` runs

## Installation

Copy to your Claude Code skills directory:

**Linux/macOS:**
```bash
cp -r lazy ~/.claude/skills/
```

**Windows PowerShell:**
```powershell
Copy-Item -Recurse lazy "$env:USERPROFILE\.claude\skills\"
```

---

**Inspired by:** [ponytail](https://github.com/DietrichGebert/ponytail) by DietrichGebert -- philosophy only; this is an independent implementation

**Augmented by:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)

**License:** MIT
