# `/security-review` -- Security Review Checklist

Comprehensive security review skill for authentication, input validation, secrets management, API endpoints, and deployment readiness.

## Usage

```
/security-review
```

## Features

- 10-section security checklist: secrets, input validation, SQL injection, auth, XSS, CSRF, rate limiting, data exposure, blockchain (optional), dependencies
- Code examples for each vulnerability type with correct/incorrect patterns
- Pre-deployment security checklist with 17 verification items
- Automated security test patterns for authentication, authorization, input validation, and rate limiting
- Row Level Security patterns for database protection
- Content Security Policy configuration examples
- Dependency vulnerability scanning commands

## Installation

Copy to your Claude Code skills directory:

**Linux/macOS:**
```bash
cp -r security-review ~/.claude/skills/
```

**Windows PowerShell:**
```powershell
Copy-Item -Recurse security-review "$env:USERPROFILE\.claude\skills\"
```

---
**Author:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
