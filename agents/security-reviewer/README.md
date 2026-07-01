# `security-reviewer` -- Security Vulnerability Specialist

Security vulnerability detection and remediation specialist. Use proactively after writing code that handles user input, authentication, API endpoints, or sensitive data.

## Capabilities

- Detect OWASP Top 10 vulnerabilities (injection, XSS, SSRF, broken auth, etc.)
- Find hardcoded secrets (API keys, passwords, tokens)
- Verify input validation and sanitization
- Review authentication and authorization implementations
- Check dependency security with npm audit
- Identify race conditions in financial operations
- Generate detailed security review reports with remediation guidance

## Tools Used

`Read`, `Write`, `Edit`, `Bash`, `Grep`, `Glob`

## Model

Recommended: `opus`

## When to Use

- After adding new API endpoints
- When authentication/authorization code changes
- When user input handling is added
- After modifying database queries
- When payment/financial code changes
- Before major releases (security audit)
- After dependency updates

## Installation

Copy to your Claude Code agents directory:

**Linux/macOS:**
```bash
mkdir -p ~/.claude/agents/
cp security-reviewer.md ~/.claude/agents/
```

**Windows PowerShell:**
```powershell
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.claude\agents"
Copy-Item security-reviewer.md "$env:USERPROFILE\.claude\agents\"
```

---
**Author:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
