# `/python-review` -- Python Code Review

Comprehensive Python code review for PEP 8 compliance, type hints, security vulnerabilities, and Pythonic idioms.

## Usage

```
/python-review
```

## Features

- Identifies modified Python files via git diff
- Runs static analysis: ruff, mypy, pylint, black, bandit
- Categorizes issues by severity: CRITICAL, HIGH, MEDIUM
- Security scanning for SQL injection, command injection, unsafe deserialization
- Framework-specific reviews for Django, FastAPI, and Flask
- Common fix suggestions with before/after code examples
- Python version compatibility warnings
- Approval criteria: Approve, Warning, or Block

## Installation

Copy to your Claude Code skills directory:

**Linux/macOS:**
```bash
cp -r python-review ~/.claude/skills/
```

**Windows PowerShell:**
```powershell
Copy-Item -Recurse python-review "$env:USERPROFILE\.claude\skills\"
```

---
**Author:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
