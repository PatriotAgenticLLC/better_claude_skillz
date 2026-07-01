# `/learn` -- Extract Reusable Patterns

Analyze the current session and extract any patterns worth saving as reusable skills.

## Usage

```
/learn
```

## Features

- Extracts error resolution patterns from the current session
- Captures debugging techniques and non-obvious tool combinations
- Documents library quirks and API workarounds
- Saves discovered project-specific patterns as skill files
- Filters out trivial fixes and one-time issues

## Installation

Copy to your Claude Code skills directory:

**Linux/macOS:**
```bash
cp -r learn ~/.claude/skills/
```

**Windows PowerShell:**
```powershell
Copy-Item -Recurse learn "$env:USERPROFILE\.claude\skills\"
```

---
**Author:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
