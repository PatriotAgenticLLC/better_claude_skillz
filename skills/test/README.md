# `/test` -- Universal Test Runner

Auto-detects your project type and runs the right test suite, so one command works across every repo you touch.

## Usage

```
/test [--unit|--integration|--e2e|--coverage|<path>]
```

## Features

- Auto-detects Python (pytest), Node.js (vitest/jest), and Go projects from their manifest files
- Detects the Node package manager (npm, pnpm, yarn, bun) from the lock file
- Scopes runs with `--unit`, `--integration`, `--e2e`, `--coverage`, or a specific path
- Prefers existing `test:*` scripts in package.json and pytest markers over generic commands
- Respects project-specific test overrides declared in CLAUDE.md
- Reports pass/fail/skip counts, coverage, and duration

## Installation

Copy to your Claude Code skills directory:

**Linux/macOS:**
```bash
cp -r test ~/.claude/skills/
```

**Windows PowerShell:**
```powershell
Copy-Item -Recurse test "$env:USERPROFILE\.claude\skills\"
```

---
**Author:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
