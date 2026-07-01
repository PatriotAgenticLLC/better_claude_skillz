# `/validate` -- Project Validation Suite

Run the project's full validation suite across syntax, tests, integration, and build verification.

## Usage

```
/validate
```

## Features

- 4-level validation: syntax/style, unit tests, integration tests, build verification
- Multi-language support: Python (ruff, mypy, pytest), Node.js (eslint, jest, vitest), PHP (phpcs, phpstan, phpunit)
- Reads project CLAUDE.md for project-specific validation commands
- Stops on first failure and reports the issue
- Clear pass/fail summary with test counts and failure details
- Suggests adding validation commands to CLAUDE.md if missing

## Installation

Copy to your Claude Code skills directory:

**Linux/macOS:**
```bash
cp -r validate ~/.claude/skills/
```

**Windows PowerShell:**
```powershell
Copy-Item -Recurse validate "$env:USERPROFILE\.claude\skills\"
```

---
**Author:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
