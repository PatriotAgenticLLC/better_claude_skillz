# `go-build-resolver` -- Go Build Error Fixer

Go build, vet, and compilation error resolution specialist. Fixes build errors, go vet issues, and linter warnings with minimal, surgical changes.

## Capabilities

- Diagnose and fix Go compilation errors
- Resolve `go vet` warnings and static analysis issues
- Handle module dependency problems (go.mod, go.sum)
- Fix type errors and interface mismatches
- Resolve import cycles with package restructuring guidance
- Apply minimal fixes without refactoring

## Tools Used

`Read`, `Write`, `Edit`, `Bash`, `Grep`, `Glob`

## Model

Recommended: `opus`

## When to Use

- `go build ./...` fails
- `go vet ./...` reports warnings
- Module dependency issues (missing packages, version conflicts)
- Type errors or interface mismatches
- Import cycle resolution needed

## Installation

Copy to your Claude Code agents directory:

**Linux/macOS:**
```bash
mkdir -p ~/.claude/agents/
cp go-build-resolver.md ~/.claude/agents/
```

**Windows PowerShell:**
```powershell
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.claude\agents"
Copy-Item go-build-resolver.md "$env:USERPROFILE\.claude\agents\"
```

---
**Author:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
