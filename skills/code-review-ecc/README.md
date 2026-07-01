# `/code-review-ecc` -- Enhanced Code Review with Commit Blocking

Comprehensive security and quality review of uncommitted changes with automatic commit blocking for critical issues.

## Usage

```
/code-review-ecc
```

## Features

- Security-first review checking for hardcoded credentials, SQL injection, XSS, and path traversal
- Code quality checks for function length, file size, nesting depth, and error handling
- Best practices validation including immutability patterns and accessibility
- Automatic commit blocking when CRITICAL or HIGH severity issues are found
- Structured report with severity levels, file locations, and suggested fixes

## Installation

Copy to your Claude Code skills directory:

**Linux/macOS:**
```bash
cp -r code-review-ecc ~/.claude/skills/
```

**Windows PowerShell:**
```powershell
Copy-Item -Recurse code-review-ecc "$env:USERPROFILE\.claude\skills\"
```

---
**Author:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
