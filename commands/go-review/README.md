# `/go-review` -- Comprehensive Go Code Review

Performs a thorough Go-specific code review covering idiomatic patterns, concurrency safety, error handling, and security. Invokes the go-reviewer agent.

## Usage

```
/go-review
```

## Features

- Identifies modified `.go` files via `git diff` and runs static analysis (`go vet`, `staticcheck`, `golangci-lint`)
- Scans for security issues including SQL injection, command injection, and race conditions
- Reviews concurrency patterns: goroutine safety, channel usage, mutex correctness
- Checks for idiomatic Go conventions and best practices
- Categorizes issues by severity (CRITICAL, HIGH, MEDIUM) with specific fix recommendations
- Provides merge approval guidance: Approve, Warning, or Block

## Installation

Copy to your Claude Code commands directory:

**Linux/macOS:**
```bash
mkdir -p ~/.claude/commands/
cp go-review.md ~/.claude/commands/
```

**Windows PowerShell:**
```powershell
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.claude\commands"
Copy-Item go-review.md "$env:USERPROFILE\.claude\commands\"
```

## Related

- `/go-test` -- Run tests before reviewing
- `/go-build` -- Fix build errors before reviewing
- Agent: `agents/go-reviewer.md`

---
**Author:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
