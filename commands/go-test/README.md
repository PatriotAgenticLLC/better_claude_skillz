# `/go-test` -- Test-Driven Development for Go

Enforces a strict TDD workflow for Go code: write table-driven tests first, then implement, then verify 80%+ coverage with `go test -cover`.

## Usage

```
/go-test [description of what to implement]
```

## Features

- Follows the RED-GREEN-REFACTOR cycle: failing test first, minimal implementation, then improvement
- Scaffolds function signatures and interfaces before writing tests
- Generates idiomatic table-driven tests with comprehensive edge cases
- Verifies tests fail for the right reason before implementation
- Checks coverage targets: 100% for critical logic, 90%+ for public APIs, 80%+ for general code
- Supports parallel test execution and test helper patterns
- Includes race detection via `go test -race`

## Installation

Copy to your Claude Code commands directory:

**Linux/macOS:**
```bash
mkdir -p ~/.claude/commands/
cp go-test.md ~/.claude/commands/
```

**Windows PowerShell:**
```powershell
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.claude\commands"
Copy-Item go-test.md "$env:USERPROFILE\.claude\commands\"
```

## Related

- `/go-build` -- Fix build errors if tests reveal compilation issues
- `/go-review` -- Review code quality after implementation
- Skill: `skills/golang-testing/`

---
**Author:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
