# `go-reviewer` -- Expert Go Code Reviewer

Expert Go code reviewer specializing in idiomatic Go, concurrency patterns, error handling, and performance. Use for all Go code changes.

## Capabilities

- Review for security vulnerabilities (SQL injection, command injection, path traversal, race conditions)
- Enforce proper error handling with wrapping and context
- Analyze concurrency patterns (goroutine leaks, deadlocks, mutex misuse)
- Check code quality (function size, nesting, interface usage)
- Evaluate performance (string building, slice pre-allocation, N+1 queries)
- Enforce Go best practices (context propagation, table-driven tests, godoc comments)
- Detect Go-specific anti-patterns (init abuse, empty interface overuse, deferred calls in loops)

## Tools Used

`Read`, `Grep`, `Glob`, `Bash`

## Model

Recommended: `opus`

## When to Use

- After writing or modifying Go code
- Before committing Go changes
- During pull request reviews for Go projects
- When refactoring Go code

## Installation

Copy to your Claude Code agents directory:

**Linux/macOS:**
```bash
mkdir -p ~/.claude/agents/
cp go-reviewer.md ~/.claude/agents/
```

**Windows PowerShell:**
```powershell
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.claude\agents"
Copy-Item go-reviewer.md "$env:USERPROFILE\.claude\agents\"
```

---
**Author:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
