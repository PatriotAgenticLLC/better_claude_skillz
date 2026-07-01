# `/perf-profile` -- Performance Profiler

Profiles Python and Node.js apps to surface slow endpoints, memory leaks, and CPU bottlenecks through static analysis plus runtime profiling guidance.

## Usage

```
/perf-profile [--python|--node|--endpoint <url>|--memory|--cpu]
```

## Features

- Endpoint timing with a curl breakdown (DNS/connect/TLS/TTFB/total) and p50/p95/p99 across repeated requests
- Python static analysis for N+1 queries, sync I/O in async code, missing pagination, and polling anti-patterns
- Node.js static analysis for sync fs calls, unhandled promises, stray console.log, and large JSON payloads
- Memory analysis via process inspection and Docker container stats
- Slow query/function finder for unbounded SELECTs, missing indexes, and large loop operations
- Low-overhead runtime recipes (cProfile, py-spy, memory_profiler, node --prof, clinic.js); static analysis stays read-only by default

## Installation

Copy to your Claude Code skills directory:

**Linux/macOS:**
```bash
cp -r perf-profile ~/.claude/skills/
```

**Windows PowerShell:**
```powershell
Copy-Item -Recurse perf-profile "$env:USERPROFILE\.claude\skills\"
```

---
**Author:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
