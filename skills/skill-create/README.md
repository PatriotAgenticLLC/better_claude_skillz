# `/skill-create` -- Local Skill Generation

Analyze your repository's git history to extract coding patterns and generate SKILL.md files that teach Claude your team's practices.

## Usage

```
/skill-create
/skill-create --commits 100
/skill-create --output ./skills
/skill-create --instincts
```

## Features

- Parses git history to detect recurring patterns and workflows
- Detects commit conventions, file co-changes, and architecture patterns
- Generates valid Claude Code SKILL.md files from analysis
- Optional instinct generation for continuous-learning-v2 integration
- Supports custom commit count and output directory
- GitHub App integration for advanced features (10k+ commits, team sharing)

## Installation

Copy to your Claude Code skills directory:

**Linux/macOS:**
```bash
cp -r skill-create ~/.claude/skills/
```

**Windows PowerShell:**
```powershell
Copy-Item -Recurse skill-create "$env:USERPROFILE\.claude\skills\"
```

---
**Based on:** [Everything Claude Code](https://github.com/affaan-m/everything-claude-code) by @affaan-m
**Augmented by:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
