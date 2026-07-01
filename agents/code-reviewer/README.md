# `code-reviewer` -- Expert Code Review Specialist

Expert code review specialist that proactively reviews code for quality, security, and maintainability. Use immediately after writing or modifying code.

## Capabilities

- Review code for security vulnerabilities (hardcoded credentials, SQL injection, XSS)
- Check code quality (function size, nesting depth, error handling)
- Analyze performance (algorithm complexity, unnecessary re-renders, N+1 queries)
- Enforce best practices (naming, formatting, accessibility)
- Provide prioritized feedback with specific fix examples

## Tools Used

`Read`, `Grep`, `Glob`, `Bash`

## Model

Recommended: `opus`

## When to Use

- After writing or modifying any code
- Before committing changes
- During pull request reviews
- When refactoring existing code

## Installation

Copy to your Claude Code agents directory:

**Linux/macOS:**
```bash
mkdir -p ~/.claude/agents/
cp code-reviewer.md ~/.claude/agents/
```

**Windows PowerShell:**
```powershell
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.claude\agents"
Copy-Item code-reviewer.md "$env:USERPROFILE\.claude\agents\"
```

---
**Author:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
