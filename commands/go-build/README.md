# `/go-build` -- Fix Go Build Errors Incrementally

Diagnoses and fixes Go build errors, `go vet` warnings, and linter issues one at a time with minimal, surgical changes. Invokes the go-build-resolver agent.

## Usage

```
/go-build
```

## Features

- Runs `go build`, `go vet`, `staticcheck`, and `golangci-lint` to collect all diagnostics
- Groups errors by file and sorts by severity
- Fixes one error at a time, re-running the build after each change to verify
- Handles module dependency issues with `go mod verify` and `go mod tidy`
- Stops and reports if a fix introduces more errors, the same error persists after 3 attempts, or architectural changes are needed
- Produces a final summary table of errors fixed, files modified, and remaining issues

## Installation

Copy to your Claude Code commands directory:

**Linux/macOS:**
```bash
mkdir -p ~/.claude/commands/
cp go-build.md ~/.claude/commands/
```

**Windows PowerShell:**
```powershell
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.claude\commands"
Copy-Item go-build.md "$env:USERPROFILE\.claude\commands\"
```

## Related

- `/go-test` -- Run tests after the build succeeds
- `/go-review` -- Review code quality after fixes
- Agent: `agents/go-build-resolver.md`

---
**Author:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
