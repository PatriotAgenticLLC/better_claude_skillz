# `/tdd` -- Test-Driven Development

Enforce test-driven development workflow: scaffold interfaces, generate tests FIRST, then implement minimal code to pass, and ensure 80%+ coverage.

## Usage

```
/tdd I need a function to calculate liquidity score
```

## Features

- Full TDD cycle enforcement: RED, GREEN, REFACTOR
- Interface scaffolding before implementation
- Generates failing tests first, then minimal implementation
- Refactoring phase with test re-verification
- Coverage verification with 80%+ minimum (100% for critical code)
- Supports unit, integration, and E2E test types
- Works with Jest, Vitest, pytest, and other test frameworks

## Installation

Copy to your Claude Code skills directory:

**Linux/macOS:**
```bash
cp -r tdd ~/.claude/skills/
```

**Windows PowerShell:**
```powershell
Copy-Item -Recurse tdd "$env:USERPROFILE\.claude\skills\"
```

---
**Author:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
