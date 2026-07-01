# `python-reviewer` -- Expert Python Code Reviewer

Expert Python code reviewer specializing in PEP 8 compliance, Pythonic idioms, type hints, security, and performance. Use for all Python code changes.

## Capabilities

- Review for security vulnerabilities (SQL injection, command injection, eval abuse, pickle risks)
- Enforce proper error handling (no bare except, context managers, proper cleanup)
- Check type hint coverage and correctness
- Enforce Pythonic patterns (comprehensions, context managers, enums, proper iteration)
- Analyze code quality (function size, nesting depth, parameter count)
- Evaluate concurrency safety (threading locks, async/await correctness)
- Check performance (N+1 queries, string operations, unnecessary allocations)
- Framework-specific checks (Django, FastAPI, Flask)

## Tools Used

`Read`, `Grep`, `Glob`, `Bash`

## Model

Recommended: `opus`

## When to Use

- After writing or modifying Python code
- Before committing Python changes
- During pull request reviews for Python projects
- When refactoring Python code

## Installation

Copy to your Claude Code agents directory:

**Linux/macOS:**
```bash
mkdir -p ~/.claude/agents/
cp python-reviewer.md ~/.claude/agents/
```

**Windows PowerShell:**
```powershell
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.claude\agents"
Copy-Item python-reviewer.md "$env:USERPROFILE\.claude\agents\"
```

---
**Author:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
