# `/code-review` -- Pre-Commit Technical Code Review

Technical code review for quality and bugs that analyzes recently changed files before committing.

## Usage

```
/code-review
```

## Features

- Analyzes all staged and unstaged changes for logic errors, security issues, and performance problems
- Checks adherence to codebase standards documented in CLAUDE.md and reference docs
- Generates structured review reports saved to `.claude/code-reviews/`
- Severity-based classification (Critical, High, Medium, Low)
- Provides specific line numbers and actionable fix suggestions

## Installation

Copy to your Claude Code skills directory:

**Linux/macOS:**
```bash
cp -r code-review ~/.claude/skills/
```

**Windows PowerShell:**
```powershell
Copy-Item -Recurse code-review "$env:USERPROFILE\.claude\skills\"
```

---
**Author:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
