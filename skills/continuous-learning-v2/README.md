# `/continuous-learning-v2` -- Instinct-Based Learning System

An advanced learning system that turns your Claude Code sessions into reusable knowledge through atomic "instincts" -- small learned behaviors with confidence scoring that evolve into skills, commands, and agents.

## Usage

```
/continuous-learning-v2
```

## Features

- Observes sessions via PreToolUse/PostToolUse hooks with 100% reliability
- Creates atomic instincts with confidence scoring (0.3 tentative to 0.9 near-certain)
- Detects patterns from user corrections, error resolutions, and repeated workflows
- Clusters related instincts into evolved skills, commands, and agents via `/evolve`
- Export and import instincts for team sharing and cross-machine transfer

## Installation

Copy to your Claude Code skills directory:

**Linux/macOS:**
```bash
cp -r continuous-learning-v2 ~/.claude/skills/
```

**Windows PowerShell:**
```powershell
Copy-Item -Recurse continuous-learning-v2 "$env:USERPROFILE\.claude\skills\"
```

---
**Inspired by:** [Homunculus](https://github.com/humanplane/homunculus) by humanplane and [The Longform Guide](https://x.com/affaanmustafa) by @affaanmustafa
**Augmented by:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
