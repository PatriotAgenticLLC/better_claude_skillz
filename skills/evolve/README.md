# `/evolve` -- Instinct Evolution Engine

Cluster related instincts into higher-level skills, commands, or agents based on domain similarity and trigger pattern analysis.

## Usage

```
/evolve [--domain <name>] [--dry-run] [--threshold <n>] [--execute]
```

## Features

- Analyzes all learned instincts and groups them by domain, trigger overlap, and action sequences
- Evolves clusters into commands (user-invoked), skills (auto-triggered), or agents (complex multi-step)
- Preview mode by default with `--execute` flag to create evolved structures
- Configurable cluster threshold and domain filtering
- Links evolved structures back to their source instincts

## Installation

Copy to your Claude Code skills directory:

**Linux/macOS:**
```bash
cp -r evolve ~/.claude/skills/
```

**Windows PowerShell:**
```powershell
Copy-Item -Recurse evolve "$env:USERPROFILE\.claude\skills\"
```

---
**Inspired by:** [Homunculus](https://github.com/humanplane/homunculus) by humanplane and [The Longform Guide](https://x.com/affaanmustafa) by @affaanmustafa
**Augmented by:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
