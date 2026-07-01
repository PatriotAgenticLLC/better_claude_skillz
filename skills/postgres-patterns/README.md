# `/postgres-patterns` -- PostgreSQL Best Practices

Quick reference for PostgreSQL best practices including query optimization, schema design, indexing, and Row Level Security.

## Usage

```
/postgres-patterns
```

## Features

- Index cheat sheet: B-tree, GIN, BRIN with usage patterns
- Data type quick reference (correct types vs common mistakes)
- Common patterns: composite indexes, covering indexes, partial indexes, UPSERT, cursor pagination, queue processing
- Anti-pattern detection queries for unindexed foreign keys and slow queries
- RLS policy examples with performance optimization
- Configuration templates for connection limits and timeouts

## Installation

Copy to your Claude Code skills directory:

**Linux/macOS:**
```bash
cp -r postgres-patterns ~/.claude/skills/
```

**Windows PowerShell:**
```powershell
Copy-Item -Recurse postgres-patterns "$env:USERPROFILE\.claude\skills\"
```

---
**Based on:** [Supabase Agent Skills](https://github.com/supabase/agent-skills) (MIT)
**Augmented by:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
