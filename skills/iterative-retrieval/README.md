# `/iterative-retrieval` -- Progressive Context Retrieval

Solves the "context problem" in multi-agent workflows where subagents don't know what context they need until they start working.

## Usage

```
/iterative-retrieval
```

## Features

- 4-phase retrieval loop: DISPATCH, EVALUATE, REFINE, LOOP
- Progressive context narrowing with relevance scoring (0-1 scale)
- Maximum 3 cycles to prevent infinite loops
- Learns codebase terminology during retrieval
- Explicit gap identification drives refinement

## Installation

Copy to your Claude Code skills directory:

**Linux/macOS:**
```bash
cp -r iterative-retrieval ~/.claude/skills/
```

**Windows PowerShell:**
```powershell
Copy-Item -Recurse iterative-retrieval "$env:USERPROFILE\.claude\skills\"
```

---
**Based on:** [The Longform Guide](https://x.com/affaanmustafa) by @affaanmustafa
**Augmented by:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
