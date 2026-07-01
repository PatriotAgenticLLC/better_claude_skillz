# `tdd-guide` -- Test-Driven Development Specialist

Test-Driven Development specialist enforcing write-tests-first methodology. Use proactively when writing new features, fixing bugs, or refactoring code. Ensures 80%+ test coverage.

## Capabilities

- Enforce Red-Green-Refactor TDD cycle
- Write comprehensive test suites (unit, integration, E2E)
- Mock external dependencies (database, cache, AI APIs)
- Catch edge cases before implementation
- Verify test coverage meets 80%+ threshold
- Identify test anti-patterns (implementation detail testing, test dependencies)

## Tools Used

`Read`, `Write`, `Edit`, `Bash`, `Grep`

## Model

Recommended: `opus`

## When to Use

- Starting a new feature (write tests first)
- Fixing bugs (reproduce with test, then fix)
- Refactoring existing code (ensure tests exist first)
- When test coverage needs improvement
- Setting up testing infrastructure

## Installation

Copy to your Claude Code agents directory:

**Linux/macOS:**
```bash
mkdir -p ~/.claude/agents/
cp tdd-guide.md ~/.claude/agents/
```

**Windows PowerShell:**
```powershell
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.claude\agents"
Copy-Item tdd-guide.md "$env:USERPROFILE\.claude\agents\"
```

---
**Author:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
