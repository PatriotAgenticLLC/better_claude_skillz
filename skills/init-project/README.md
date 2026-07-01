# `/init-project` -- Initialize Project Structure

Scaffolds a new project with a standard directory layout, CLAUDE.md, README, and tech-stack-aware .gitignore for an AI development workflow.

## Usage

```
/init-project [project-path]
```

## Features

- Creates a standard `.claude/` structure (plans, code-reviews, system-reviews, PRD)
- Generates a CLAUDE.md project-configuration template with tech stack, commands, and conventions
- Generates a README.md with status, quick-start, and documentation sections
- Emits a tech-stack-specific .gitignore (Python, Node.js, or general)
- Optionally initializes a git repository with a first commit
- Interactive prompts infer project name, type, and stack, and never overwrite files without asking

## Installation

Copy to your Claude Code skills directory:

**Linux/macOS:**
```bash
cp -r init-project ~/.claude/skills/
```

**Windows PowerShell:**
```powershell
Copy-Item -Recurse init-project "$env:USERPROFILE\.claude\skills\"
```

---
**Author:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
