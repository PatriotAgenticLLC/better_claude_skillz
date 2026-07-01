# `database-reviewer` -- PostgreSQL Database Specialist

PostgreSQL database specialist for query optimization, schema design, security, and performance. Use proactively when writing SQL, creating migrations, designing schemas, or troubleshooting database performance.

## Capabilities

- Optimize queries with proper indexing strategies (B-tree, GIN, BRIN, partial, covering)
- Review schema design for proper data types, constraints, and naming
- Implement Row Level Security (RLS) with optimized policies
- Configure connection management (pooling, timeouts, limits)
- Prevent concurrency issues (deadlocks, race conditions, lock contention)
- Set up monitoring and diagnostics (pg_stat_statements, EXPLAIN ANALYZE)
- Optimize JSONB patterns and full-text search

## Tools Used

`Read`, `Write`, `Edit`, `Bash`, `Grep`, `Glob`

## Model

Recommended: `opus`

## When to Use

- Writing or modifying SQL queries
- Creating database migrations
- Designing new schemas or tables
- Troubleshooting slow queries
- Implementing multi-tenant data isolation
- Reviewing database security (RLS, permissions)

## Installation

Copy to your Claude Code agents directory:

**Linux/macOS:**
```bash
mkdir -p ~/.claude/agents/
cp database-reviewer.md ~/.claude/agents/
```

**Windows PowerShell:**
```powershell
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.claude\agents"
Copy-Item database-reviewer.md "$env:USERPROFILE\.claude\agents\"
```

---
**Based on:** [Supabase Agent Skills](https://github.com/supabase/agent-skills) (MIT)
**Augmented by:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
