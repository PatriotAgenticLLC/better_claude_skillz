---
name: extract-shared
description: Identify cross-project code duplication and generate candidates for a shared utility package.
argument-hint: "[--scan|--report|--python|--node]"
---

# Shared Utilities Extractor

Scan your projects for duplicated patterns and identify candidates for extraction into a shared utility package.

## Selecting Projects to Scan

Decide what to scan, in this order:

1. **Paths passed as arguments** — scan exactly those project directories.
2. **A workspace root** — if you keep several projects under one directory (e.g. `~/projects`), scan each immediate subdirectory.
3. **The current directory** — if neither applies, this skill needs at least two projects to compare; ask the user to point it at a workspace root or a set of paths.

## Arguments

Parse `$ARGUMENTS`:

- **No arguments or `--scan`:** Run full scan and report (default)
- **`--report`:** Show results from last scan without re-scanning
- **`--python`:** Only scan Python projects
- **`--node`:** Only scan Node.js projects

## Process

### Step 1: Define Search Patterns

Scan for these known duplication categories across the selected projects:

#### Category 1: Health Check Endpoints
Search for health endpoint implementations:
```
# Python
grep -rn "def health" --include="*.py" <path>
grep -rn "/health" --include="*.py" <path>

# Node/TypeScript
grep -rn "'/health'" --include="*.ts" --include="*.js" <path>
grep -rn "\"/health\"" --include="*.ts" --include="*.js" <path>
```

#### Category 2: Error Response Formats
Search for custom exception classes and error response patterns:
```
# Python
grep -rn "class.*Error.*Exception" --include="*.py" <path>
grep -rn "class.*APIError\|class.*AppError\|class.*ServiceError" --include="*.py" <path>

# Node/TypeScript
grep -rn "class.*Error extends" --include="*.ts" --include="*.js" <path>
```

#### Category 3: Configuration / Settings Patterns
Search for config loading patterns:
```
# Python
grep -rn "os.environ\|os.getenv\|environ.get" --include="*.py" <path> | head -10
grep -rn "class.*Config\|class.*Settings" --include="*.py" <path>

# Node/TypeScript
grep -rn "process.env" --include="*.ts" --include="*.js" <path> | head -10
```

#### Category 4: Authentication / Rate Limiting
```
# Python
grep -rn "rate.limit\|RateLimiter\|throttle" --include="*.py" <path>
grep -rn "auth.*decorator\|login_required\|verify_token" --include="*.py" <path>

# Node/TypeScript
grep -rn "rateLimit\|rate-limit" --include="*.ts" --include="*.js" <path>
grep -rn "authenticate\|verifyToken\|authMiddleware" --include="*.ts" --include="*.js" <path>
```

#### Category 5: Database Utilities
```
# Python
grep -rn "def get_db\|def create_tables\|def run_migration" --include="*.py" <path>
grep -rn "session.execute\|session.commit" --include="*.py" <path> | head -5

# Node/TypeScript
grep -rn "getConnection\|createPool\|query(" --include="*.ts" --include="*.js" <path>
```

#### Category 6: Encryption / Secrets Helpers
```
grep -rn "Fernet\|encrypt\|decrypt\|hashlib\|bcrypt" --include="*.py" <path>
grep -rn "crypto\|encrypt\|decrypt\|hash" --include="*.ts" --include="*.js" <path>
```

#### Category 7: Audit Logging
```
grep -rn "record_audit\|audit_log\|log_action\|telemetry" --include="*.py" <path>
```

#### Category 8: Docker Health Checks
```
grep -rn "healthcheck\|HEALTHCHECK" <path>/docker-compose*.yml <path>/Dockerfile 2>/dev/null
```

### Step 2: Collect and Compare

For each category, collect the implementations found across projects. Use the Grep tool for each pattern across each project directory.

Group results by category and compare:
- How many projects implement this pattern?
- Are the implementations similar enough to share?
- What's the effort to extract vs. keep separate?

### Step 3: Analyze Similarity

For patterns found in 2+ projects, read the actual implementation files and compare:

1. Read the relevant function/class from each project
2. Assess similarity (identical, similar with minor differences, fundamentally different)
3. Rate extraction feasibility: Easy (copy-paste), Medium (needs abstraction), Hard (too different)

### Step 4: Report

```
## Cross-Project Duplication Report

### High-Value Extraction Candidates (found in 3+ projects)

#### 1. Health Check Endpoints
- **Projects:** api-service, web-app, dashboard, platform
- **Pattern:** GET /health returning {status: "healthy", service: "<name>"}
- **Similarity:** High — nearly identical implementations
- **Extraction effort:** Easy
- **Recommendation:** Create shared `health_check()` factory function

#### 2. Error Response Formats
- **Projects:** api-service, web-app
- **Pattern:** Custom exception classes with JSON error responses
- **Similarity:** Medium — same structure, different exception types
- **Extraction effort:** Medium
- **Recommendation:** Create shared base error classes with JSON serialization

### Medium-Value Candidates (found in 2 projects)

#### 3. Encryption Utilities
- **Projects:** api-service (Fernet), web-app (potential)
- **Similarity:** Low — only one project has it currently
- **Extraction effort:** Easy
- **Recommendation:** Extract if second project needs it

...

### Not Worth Extracting (domain-specific)

- Business-logic parsers unique to a single project
- Third-party integration sync code used by only one project
- Bespoke handlers unique to one product

### Proposed Shared Package Structure

If extracting a Python shared package (`shared-common`):
```
shared-common/
├── pyproject.toml
├── shared_common/
│   ├── __init__.py
│   ├── health.py          # Health check endpoint factory
│   ├── errors.py          # Base error classes
│   ├── config.py          # Configuration loader
│   ├── auth.py            # Auth decorators
│   ├── audit.py           # Audit logging
│   └── encryption.py      # Encryption helpers
└── tests/
    └── ...
```

If extracting a Node shared package (`@yourorg/common`):
```
shared-common-node/
├── package.json
├── src/
│   ├── health.ts
│   ├── errors.ts
│   ├── config.ts
│   └── auth.ts
└── tests/
    └── ...
```

### Summary

| Category | Projects | Similarity | Effort | Priority |
|----------|----------|-----------|--------|----------|
| Health checks | 4 | High | Easy | HIGH |
| Error formats | 2 | Medium | Medium | MEDIUM |
| Config loading | 4 | Medium | Medium | MEDIUM |
| Rate limiting | 2 | Low | Medium | LOW |
| Encryption | 1+ | N/A | Easy | LOW |
| Audit logging | 2 | Medium | Medium | MEDIUM |
| Docker health | 3 | High | Easy | HIGH |

Total duplication categories: X
Worth extracting now: Y
Worth extracting later: Z
Domain-specific (keep separate): W
```

## Error Handling

- If a project path doesn't exist, skip it
- If grep finds no matches in a category, report "No instances found"
- Large result sets: limit to first 10 matches per project per category
- Never modify any project files — this is analysis only

## Notes

- This skill is read-only — it identifies duplication but does not extract or create packages
- Use the report to plan extraction work in a follow-up session
- Focus on patterns that appear in 3+ projects for highest ROI
- Domain-specific code (single-project business logic, one-off integrations) should stay in its project
- The proposed package structure is a recommendation — adjust based on actual findings
- Run this quarterly or before starting a new project
