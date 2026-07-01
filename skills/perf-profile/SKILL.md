---
name: perf-profile
description: Profile Python and Node.js application performance. Identify slow endpoints, memory leaks, and CPU bottlenecks.
argument-hint: "[--python|--node|--endpoint <url>|--memory|--cpu]"
---

# Performance Profiler

Profile application performance for Python and Node.js projects. Identifies slow endpoints, memory usage, and CPU bottlenecks.

## Arguments

Parse `$ARGUMENTS`:

- **`--python`:** Profile a Python application
- **`--node`:** Profile a Node.js application
- **`--endpoint <url>`:** Profile a specific HTTP endpoint with timing
- **`--memory`:** Focus on memory usage analysis
- **`--cpu`:** Focus on CPU profiling
- **`--slow`:** Find slow functions/queries in the codebase (static analysis)
- No arguments: auto-detect project type and run overview

## Process

### Mode 1: Endpoint Profiling (`--endpoint`)

Time a specific HTTP endpoint with multiple requests:

```bash
# Single request with timing breakdown
curl -w "\n  DNS: %{time_namelookup}s\n  Connect: %{time_connect}s\n  TLS: %{time_appconnect}s\n  TTFB: %{time_starttransfer}s\n  Total: %{time_total}s\n  Size: %{size_download} bytes\n" -o /dev/null -s <url>

# Multiple requests for p50/p95/p99 (10 requests)
for i in $(seq 1 10); do
  curl -o /dev/null -s -w "%{time_total}\n" <url>
done | sort -n | awk '
  { a[NR] = $1; sum += $1 }
  END {
    print "  Requests: " NR
    print "  Mean: " sum/NR "s"
    print "  p50: " a[int(NR*0.5)] "s"
    print "  p95: " a[int(NR*0.95)] "s"
    print "  p99: " a[int(NR*0.99)] "s"
    print "  Min: " a[1] "s"
    print "  Max: " a[NR] "s"
  }
'
```

### Mode 2: Python Profiling (`--python`)

#### Static Analysis — Find Slow Patterns
Search for known performance anti-patterns:

```bash
# N+1 query patterns (SQLAlchemy)
grep -rn "\.query\." --include="*.py" <path> | grep -i "for\|loop\|iter"

# Synchronous I/O in async code
grep -rn "requests\.\(get\|post\|put\)" --include="*.py" <path>

# Missing pagination
grep -rn "\.all()" --include="*.py" <path>

# Large file reads without streaming
grep -rn "\.read()" --include="*.py" <path> | grep -v test

# Sleep calls (potential polling anti-pattern)
grep -rn "time\.sleep\|asyncio\.sleep" --include="*.py" <path>
```

#### Runtime Profiling (if app is running)
Suggest profiling commands:

```
To profile a running Python app:

# cProfile (built-in)
python -m cProfile -s cumtime app.py 2>&1 | head -30

# py-spy (sampling profiler, no code changes needed)
pip install py-spy
py-spy top --pid <PID>           # Live top-like view
py-spy record --pid <PID> -o profile.svg  # Flame graph

# memory_profiler
pip install memory_profiler
python -m memory_profiler app.py
```

### Mode 3: Node.js Profiling (`--node`)

#### Static Analysis
```bash
# Synchronous fs operations
grep -rn "readFileSync\|writeFileSync\|existsSync" --include="*.ts" --include="*.js" <path>

# Missing async/await (potential unhandled promises)
grep -rn "\.then(" --include="*.ts" --include="*.js" <path> | grep -v node_modules | head -10

# Console.log in production code
grep -rn "console\.log" --include="*.ts" --include="*.js" <path> | grep -v node_modules | grep -v test

# Large payload without streaming
grep -rn "JSON\.parse\|JSON\.stringify" --include="*.ts" --include="*.js" <path> | grep -v node_modules | head -10
```

#### Runtime Suggestions
```
To profile a running Node.js app:

# Built-in profiler
node --prof app.js
node --prof-process isolate-*.log > profile.txt

# Clinic.js (comprehensive)
npx clinic doctor -- node app.js
npx clinic flame -- node app.js

# Heap snapshot
node --inspect app.js
# Then connect Chrome DevTools to chrome://inspect
```

### Mode 4: Memory Analysis (`--memory`)

**Python:**
```bash
# Check process memory (if running)
ps aux | grep -E "python|uvicorn|gunicorn" | grep -v grep | awk '{print $2, $4"%", $6/1024"MB", $11}'

# Check for memory leak patterns
grep -rn "global\|cache\s*=\s*{}\|_cache\|lru_cache" --include="*.py" <path> | head -10
```

**Node.js:**
```bash
# Check process memory
ps aux | grep -E "node|next|express" | grep -v grep | awk '{print $2, $4"%", $6/1024"MB", $11}'
```

**Docker containers:**
```bash
docker stats --no-stream --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.MemPerc}}" 2>/dev/null
```

### Mode 5: Slow Query/Function Finder (`--slow`)

Search for potentially slow operations:

```bash
# Database queries without limits
grep -rn "SELECT.*FROM" --include="*.py" --include="*.ts" <path> | grep -v "LIMIT\|limit\|test" | head -10

# Missing indexes (check model definitions)
grep -rn "Column\|mapped_column" --include="*.py" <path> | grep -v "index=True\|primary_key" | head -10

# Large loop operations
grep -rn "for.*in.*\.all()\|for.*in.*find(" --include="*.py" <path>
```

## Report

```
## Performance Profile: <project-name>

### Endpoint Timing (if --endpoint)
| Metric | Value |
|--------|-------|
| Mean | 0.234s |
| p50 | 0.198s |
| p95 | 0.412s |
| p99 | 0.891s |

### Static Analysis Findings
| Category | Count | Severity | Files |
|----------|-------|----------|-------|
| Sync I/O in async code | 3 | HIGH | api/routes.py, services/email.py |
| Missing pagination (.all()) | 5 | MEDIUM | models.py, reports.py |
| N+1 query patterns | 2 | HIGH | orders.py |

### Memory (if --memory)
| Process | PID | Memory | CPU |
|---------|-----|--------|-----|
| uvicorn | 12345 | 245MB | 2.3% |

### Recommendations
1. [HIGH] Replace `requests.get()` with `httpx` async client in 3 files
2. [HIGH] Add pagination to 5 `.all()` queries
3. [MEDIUM] Add database indexes for frequently queried columns
```

## Error Handling

- If no running processes found: skip runtime checks, report static analysis only
- If Docker not available: skip container stats
- If endpoint unreachable: report connection error with timing
- If project type can't be detected: ask user to specify --python or --node

## Notes

- Static analysis is always safe — it only reads code, never modifies it
- Runtime profiling suggestions are provided as commands for the user to run
- For production profiling, always recommend `py-spy` (Python) or `clinic` (Node) as they have low overhead
- Endpoint profiling with curl is safe for read endpoints; be cautious with POST/PUT/DELETE
