# `/clickhouse-io` -- ClickHouse Analytics Patterns

A reference of production ClickHouse patterns (table engines, query optimization, materialized views, and ingestion) for building fast, high-volume analytical workloads.

## Usage

```
/clickhouse-io
```

## Features

- Table design across MergeTree, ReplacingMergeTree, and AggregatingMergeTree engines
- Query optimization: indexed filtering, ClickHouse-native aggregations, quantiles, and window functions
- Bulk and streaming insert patterns with batch-over-loop guidance
- Materialized views for real-time rollups, plus `system.query_log` / `system.parts` monitoring queries
- Ready-to-adapt analytics queries for time series, retention, funnel, and cohort analysis
- ETL and CDC pipeline patterns from PostgreSQL, with partitioning, ordering, and data-type best practices

## Installation

Copy to your Claude Code skills directory:

**Linux/macOS:**
```bash
cp -r clickhouse-io ~/.claude/skills/
```

**Windows PowerShell:**
```powershell
Copy-Item -Recurse clickhouse-io "$env:USERPROFILE\.claude\skills\"
```

---
**Author:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
