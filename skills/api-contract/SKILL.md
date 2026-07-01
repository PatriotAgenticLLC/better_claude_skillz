---
name: api-contract
description: Generate OpenAPI specs from code, validate API contracts, and check for breaking changes between versions.
argument-hint: "[--generate|--validate|--breaking|--endpoints]"
---

# API Contract Manager

Generate OpenAPI specifications from code, validate API responses against contracts, and detect breaking changes.

## Supported Frameworks

Auto-detects the API framework in the current project:

| Framework | API Style | Route Discovery |
|-----------|-----------|-----------------|
| FastAPI | REST | Auto-generated OpenAPI at `/docs` and `/openapi.json` |
| Flask | REST | Blueprint / app route decorators |
| Express | REST | Manual router/app route definitions |

## Arguments

Parse `$ARGUMENTS`:

- **`--endpoints`:** List all API endpoints in the current project (default)
- **`--generate`:** Generate or update an OpenAPI spec from code
- **`--validate`:** Validate API responses against the spec
- **`--breaking`:** Check for breaking changes between current code and last tagged version
- **`--diff`:** Show API changes since last commit/tag

## Process

### Mode 1: Endpoint Discovery (`--endpoints`)

Scan the current project for all API endpoints:

**FastAPI:**
```bash
# Find all router files
grep -rn "@router\.\(get\|post\|put\|delete\|patch\)" --include="*.py" <path> | sed 's/.*@router\.//' | sed 's/(.*//' | sort
# Also check app-level routes
grep -rn "@app\.\(get\|post\|put\|delete\|patch\)" --include="*.py" <path> | head -20
# Find router registrations
grep -rn "include_router\|add_api_route" --include="*.py" <path> | head -20
```

**Flask:**
```bash
# Blueprint routes
grep -rn "@.*\.route\|@.*\.add_url_rule" --include="*.py" <path> | head -30
# Also check app-level
grep -rn "@app\.route" --include="*.py" <path> | head -20
```

**Express:**
```bash
# Router definitions
grep -rn "router\.\(get\|post\|put\|delete\|patch\)\|app\.\(get\|post\|put\|delete\|patch\)" --include="*.ts" --include="*.js" <path> | grep -v node_modules | head -30
```

Output:
```
## API Endpoints: <project-name>

| Method | Path | Handler | File |
|--------|------|---------|------|
| GET | /health | health_check | api/routers/health.py:12 |
| GET | /api/orders | list_orders | api/routers/orders.py:28 |
| POST | /api/orders | create_order | api/routers/orders.py:45 |
| GET | /api/orders/{id} | get_order | api/routers/orders.py:62 |
...

Total: X endpoints (Y GET, Z POST, W PUT, V DELETE)
```

### Mode 2: OpenAPI Spec Generation (`--generate`)

**FastAPI projects** (auto-generated):
FastAPI auto-generates OpenAPI at runtime. Extract it:
```bash
# If the app is running locally
curl -s http://localhost:8000/openapi.json 2>/dev/null | python3 -m json.tool > openapi.json

# If not running, check for existing spec
test -f <path>/openapi.json && echo "Spec exists" || echo "No spec file"
```

**Flask/Express projects** (manual generation):
Scan route definitions and generate a spec skeleton:

1. Collect all endpoints from Mode 1
2. For each endpoint, check for:
   - Request body schemas (Pydantic models, Zod schemas, JSON validation)
   - Response types (return type hints, response models)
   - Path parameters
   - Query parameters
   - Authentication requirements (decorators, middleware)
3. Generate an OpenAPI 3.0 YAML skeleton:

```yaml
openapi: "3.0.3"
info:
  title: <project-name> API
  version: <from-manifest>
paths:
  /health:
    get:
      summary: Health check
      responses:
        "200":
          description: Service healthy
  /api/orders:
    get:
      summary: List orders
      parameters: []
      responses:
        "200":
          description: Order list
```

Write to `openapi.yaml` in the project root.

### Mode 3: Contract Validation (`--validate`)

If an OpenAPI spec exists, validate the live API against it:

```bash
# Check if the spec exists
test -f openapi.json -o -f openapi.yaml

# For each endpoint in the spec, make a test request and verify:
# 1. Status code matches expected
# 2. Response content-type matches
# 3. Required fields are present
```

For FastAPI, the built-in `/docs` endpoint validates interactively. Suggest:
```
FastAPI projects self-validate via /docs (Swagger UI) and /redoc.

For automated validation:
  pip install schemathesis
  schemathesis run http://localhost:8000/openapi.json
```

### Mode 4: Breaking Change Detection (`--breaking`)

Compare current API surface with the last tagged version:

```bash
# Get the last tag
LAST_TAG=$(git describe --tags --abbrev=0 2>/dev/null)

# Check out the old version's routes to a temp comparison
git show $LAST_TAG:path/to/routes.py 2>/dev/null > /tmp/old_routes.py

# Compare endpoint lists
# Current endpoints
grep -rn "@router\." --include="*.py" <path> | sed 's/.*@router\.//' > /tmp/current_endpoints.txt
# Old endpoints (from tag)
git show $LAST_TAG -- $(git ls-files '*.py' | grep -E 'route|router|api') 2>/dev/null | grep "@router\." | sed 's/.*@router\.//' > /tmp/old_endpoints.txt

# Diff
diff /tmp/old_endpoints.txt /tmp/current_endpoints.txt
```

Classify changes:
- **Breaking:** Removed endpoints, changed required parameters, narrowed response types
- **Non-breaking:** Added endpoints, added optional parameters, expanded response types
- **Potentially breaking:** Changed parameter types, renamed fields

Output:
```
## Breaking Change Analysis: v1.2.1 -> current

### Breaking Changes (0)
None detected.

### Non-Breaking Changes (3)
- ADDED: GET /api/reports/shipping
- ADDED: POST /api/verification/complete
- ADDED: GET /api/schedule/import

### Potentially Breaking (1)
- MODIFIED: POST /api/orders — new required field `shipping_method`

Safe to deploy: YES/NO
```

### Mode 5: API Diff (`--diff`)

Show API surface changes since last commit:

```bash
# Files that define routes
ROUTE_FILES=$(git diff --name-only HEAD~1 | grep -E "route|router|api|endpoint" | head -20)

# For each changed file, show the route changes
for f in $ROUTE_FILES; do
  echo "=== $f ==="
  git diff HEAD~1 -- "$f" | grep -E "^\+.*@(router|app)\.(get|post|put|delete)|^\-.*@(router|app)\.(get|post|put|delete)"
done
```

## Report

```
## API Contract Report: <project-name>

Endpoints: X total (Y GET, Z POST, W PUT, V DELETE)
OpenAPI spec: [exists/missing]
Last breaking change: [tag/date]
Contract health: [VALID/NEEDS_UPDATE/NO_SPEC]
```

## Error Handling

- If no API routes found: "No API endpoints detected. Is this an API project?"
- If app not running (for validation): suggest starting the dev server first
- If no git tags (for breaking changes): compare against initial commit
- If OpenAPI spec is outdated: flag it and suggest regeneration

## Notes

- FastAPI projects get the most value since OpenAPI is auto-generated
- Flask/Express spec generation produces skeletons that need manual refinement
- Breaking change detection is heuristic — it catches route-level changes but not schema changes
- For full contract testing, recommend `schemathesis` (Python) or `dredd` (Node)
- This skill is read-only for analysis; `--generate` writes an openapi.yaml skeleton only
