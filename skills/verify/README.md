# `/verify` -- Comprehensive Verification

Run comprehensive verification on current codebase state including build, types, lint, tests, and git status.

## Usage

```
/verify
/verify quick
/verify full
/verify pre-commit
/verify pre-pr
```

## Features

- 6-step verification: build, type check, lint, test suite, console.log audit, git status
- Multiple modes: quick (build + types), full (all checks), pre-commit, pre-pr (+ security scan)
- Coverage percentage reporting
- Console.log detection in source files
- Concise pass/fail report with "Ready for PR" indicator
- Fix suggestions for critical issues

## Installation

Copy to your Claude Code skills directory:

**Linux/macOS:**
```bash
cp -r verify ~/.claude/skills/
```

**Windows PowerShell:**
```powershell
Copy-Item -Recurse verify "$env:USERPROFILE\.claude\skills\"
```

---
**Author:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
