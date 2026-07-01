# `/strategic-compact` -- Strategic Context Compaction

Suggests manual `/compact` at logical workflow intervals rather than relying on arbitrary auto-compaction that may interrupt complex tasks.

## Usage

```
/strategic-compact
```

## Features

- Tracks tool call count within a session
- Suggests compaction at configurable threshold (default: 50 calls)
- Periodic reminders every 25 calls after threshold
- Preserves context through logical task phase boundaries
- Configurable via COMPACT_THRESHOLD environment variable
- PreToolUse hook integration for Edit/Write operations

## Installation

Copy to your Claude Code skills directory:

**Linux/macOS:**
```bash
cp -r strategic-compact ~/.claude/skills/
```

**Windows PowerShell:**
```powershell
Copy-Item -Recurse strategic-compact "$env:USERPROFILE\.claude\skills\"
```

---
**Based on:** [The Longform Guide](https://x.com/affaanmustafa) by @affaanmustafa
**Augmented by:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
