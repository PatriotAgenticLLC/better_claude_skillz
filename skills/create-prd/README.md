# `/create-prd` -- Product Requirements Document Generator

Generate a comprehensive Product Requirements Document (PRD) from the current conversation context and requirements discussed.

## Usage

```
/create-prd [filename]
```

## Features

- Generates a complete PRD with 15 structured sections covering executive summary through appendix
- Extracts requirements from conversation history including explicit needs and implicit constraints
- Includes user stories, MVP scope, architecture patterns, and implementation phases
- Produces professional markdown with checkboxes, code blocks, and tables
- Validates completeness with built-in quality checks

## Installation

Copy to your Claude Code skills directory:

**Linux/macOS:**
```bash
cp -r create-prd ~/.claude/skills/
```

**Windows PowerShell:**
```powershell
Copy-Item -Recurse create-prd "$env:USERPROFILE\.claude\skills\"
```

---
**Author:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
