# `doc-updater` -- Documentation and Codemap Specialist

Documentation and codemap specialist for keeping project documentation current with the codebase. Generates architectural maps, updates READMEs, and maintains documentation quality.

## Capabilities

- Generate architectural codemaps from codebase structure
- Update READMEs and guides from actual code
- Perform AST analysis using TypeScript compiler API
- Map dependencies and imports across modules
- Validate documentation accuracy (links, file paths, code examples)
- Generate dependency graphs and API references

## Tools Used

`Read`, `Write`, `Edit`, `Bash`, `Grep`, `Glob`

## Model

Recommended: `opus`

## When to Use

- After adding a new major feature
- When API routes or endpoints change
- After significant architecture changes
- When dependencies are added or removed
- Before releases (documentation audit)
- When setup process is modified

## Installation

Copy to your Claude Code agents directory:

**Linux/macOS:**
```bash
mkdir -p ~/.claude/agents/
cp doc-updater.md ~/.claude/agents/
```

**Windows PowerShell:**
```powershell
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.claude\agents"
Copy-Item doc-updater.md "$env:USERPROFILE\.claude\agents\"
```

---
**Author:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
