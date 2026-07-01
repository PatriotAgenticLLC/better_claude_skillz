# `/writing-style` -- Anti-AI-Slop Writing Enforcement

Enforces human-sounding prose across every text output by banning AI vocabulary, killing formulaic structures, and running a self-check protocol before delivery.

## Usage

```
/writing-style
```

## Features

- 12 core rules covering em dashes, contractions, sentence-length variance, and content-first openers
- Tiered banned-word list (never-use vs avoid-clustering) plus banned openers, closers, and chatbot artifacts
- Catalog of structural anti-patterns: binary contrasts, dramatic fragmentation, and seven "fake depth" formulas
- Claude-specific tells to eliminate (epistemic hedging, copula avoidance, over-qualification)
- Before/after rewrites and a pre-delivery self-check protocol, including the "Horoscope Test"

## Installation

Copy to your Claude Code skills directory:

**Linux/macOS:**
```bash
cp -r writing-style ~/.claude/skills/
```

**Windows PowerShell:**
```powershell
Copy-Item -Recurse writing-style "$env:USERPROFILE\.claude\skills\"
```

---
**Author:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
