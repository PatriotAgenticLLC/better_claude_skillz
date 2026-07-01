---
name: deps-audit
description: Scan one or more projects for dependency vulnerabilities, outdated packages, and cross-project version conflicts.
argument-hint: "[--python|--node|--all|<project-path>]"
---

# Cross-Project Dependency Audit

Scan one or more projects for dependency vulnerabilities, outdated packages, and cross-project version inconsistencies.

## Selecting Projects to Scan

Decide what to audit, in this order:

1. **A path passed as an argument** — audit exactly that project directory.
2. **A workspace root** — if you keep several projects under one directory (e.g. `~/projects`), scan each immediate subdirectory that contains a dependency manifest.
3. **The current directory** — if neither of the above applies, audit the project in the current working directory.

Ask the user which scope they want if it is ambiguous.

## Arguments

Parse `$ARGUMENTS`:

- **No arguments or `--all`:** Audit every discovered project (default)
- **`--python`:** Only audit Python projects
- **`--node`:** Only audit Node.js projects
- **`<project-path>`:** Audit a specific project directory

## Process

### Step 1: Discover Manifests

For each project in scope, check which dependency manifests exist:

```bash
# Python manifests
test -f <path>/requirements.txt && echo "requirements.txt"
test -f <path>/pyproject.toml && echo "pyproject.toml"

# Node manifests (check root and common subdirs like frontend/, web/, apps/)
test -f <path>/package.json && echo "package.json"
test -f <path>/frontend/package.json && echo "frontend/package.json"
test -f <path>/web/package.json && echo "web/package.json"
test -f <path>/apps/web/package.json && echo "apps/web/package.json"
test -f <path>/apps/api/package.json && echo "apps/api/package.json"

# Go manifests
test -f <path>/go.mod && echo "go.mod"
```

Skip projects with no manifests.

**Output a discovery table first:**
```
## Manifest Discovery
| Project | Python | Node | Go |
|---------|--------|------|----|
| api-service | requirements.txt | — | — |
| web-app | pyproject.toml | frontend/package.json | — |
| platform | pyproject.toml | web/package.json | — |
| dashboard | — | apps/web/package.json, apps/api/package.json | — |
| cli-tool | — | package.json (pnpm) | — |
```

### Step 2: Python Vulnerability Audit

For each project with Python dependencies:

**Option A — pip-audit available:**
```bash
cd <path> && pip-audit -r requirements.txt 2>&1
# OR
cd <path> && pip-audit 2>&1  # (uses pyproject.toml)
```

**Option B — pip-audit not available (fallback):**
```bash
# Check if pip-audit is installed
pip-audit --version 2>/dev/null || python3 -m pip_audit --version 2>/dev/null
```

If pip-audit is not installed, use safety or manual checking:
```bash
# Try safety
safety check -r <path>/requirements.txt 2>&1

# If neither available, report
echo "Neither pip-audit nor safety installed. Install with: pip install pip-audit"
```

**Option C — Read and report versions manually:**
If no audit tool is available, read the requirements file and report the dependency list with a note that automated vulnerability scanning needs `pip-audit` installed:
```bash
cat <path>/requirements.txt | grep -v "^#" | grep -v "^$" | head -30
```

### Step 3: Node.js Vulnerability Audit

For each project with Node.js dependencies:

Detect the package manager first:
```bash
test -f <path>/pnpm-lock.yaml && echo "pnpm"
test -f <path>/yarn.lock && echo "yarn"
test -f <path>/bun.lockb && echo "bun"
test -f <path>/package-lock.json && echo "npm"
```

Then run the appropriate audit:
```bash
# npm
cd <path> && npm audit --json 2>/dev/null | python3 -c "
import sys,json
try:
    d=json.load(sys.stdin)
    v=d.get('metadata',{}).get('vulnerabilities',{})
    print(f\"  critical: {v.get('critical',0)}, high: {v.get('high',0)}, moderate: {v.get('moderate',0)}, low: {v.get('low',0)}\")
except: print('  Could not parse audit output')
"

# pnpm
cd <path> && pnpm audit --json 2>/dev/null | python3 -c "
import sys,json
try:
    d=json.load(sys.stdin)
    advisories=d.get('advisories',{})
    by_severity={'critical':0,'high':0,'moderate':0,'low':0}
    for a in advisories.values():
        sev=a.get('severity','low')
        by_severity[sev]=by_severity.get(sev,0)+1
    print(f\"  critical: {by_severity['critical']}, high: {by_severity['high']}, moderate: {by_severity['moderate']}, low: {by_severity['low']}\")
except: print('  Could not parse audit output')
"
```

If lock file doesn't exist, note: "No lock file — run `<pm> install` first to generate one."

### Step 4: Outdated Packages Check

For each project, check for outdated major versions:

**Python:**
```bash
cd <path> && pip list --outdated --format=json 2>/dev/null | python3 -c "
import sys,json
try:
    pkgs=json.load(sys.stdin)
    major=[p for p in pkgs if p['latest_version'].split('.')[0] != p['version'].split('.')[0]]
    if major:
        for p in major[:10]:
            print(f\"  {p['name']}: {p['version']} -> {p['latest_version']} (MAJOR)\")
    print(f'  {len(pkgs)} total outdated, {len(major)} major version bumps')
except: print('  Could not check outdated packages')
" 2>/dev/null
```

**Node.js:**
```bash
cd <path> && npm outdated --json 2>/dev/null | python3 -c "
import sys,json
try:
    d=json.load(sys.stdin)
    major=[(k,v) for k,v in d.items() if v.get('current','0').split('.')[0] != v.get('latest','0').split('.')[0]]
    for name,v in major[:10]:
        print(f\"  {name}: {v.get('current','?')} -> {v.get('latest','?')} (MAJOR)\")
    print(f'  {len(d)} total outdated, {len(major)} major version bumps')
except: print('  Could not check outdated packages')
" 2>/dev/null
```

### Step 5: Cross-Project Version Conflicts

If auditing more than one project, compare shared dependencies:

1. Collect all Python package names and versions across projects
2. Collect all Node.js package names and versions across projects
3. Flag any package that appears in 2+ projects at different major versions

**Output format:**
```
## Cross-Project Version Conflicts
| Package | Project A (version) | Project B (version) | Risk |
|---------|-------------------|-------------------|------|
| react | dashboard (18.2.0) | platform (19.0.0) | Major mismatch |
| anthropic | api-service (0.28.0) | web-app (0.31.0) | Minor mismatch |
```

If no conflicts: "No cross-project version conflicts found."

## Report

Output a final summary:

```
## Dependency Audit Summary

| Project | Vulnerabilities | Outdated | Action Needed |
|---------|----------------|----------|---------------|
| api-service | 0 critical, 2 high | 5 major bumps | YES |
| web-app (py) | 1 critical | 3 major bumps | YES |
| web-app (node) | 0 critical, 1 high | 8 major bumps | REVIEW |
| platform (py) | 0 | 2 major bumps | LOW |
| dashboard (node) | 0 | 4 major bumps | LOW |
| cli-tool (node) | 3 high | 12 major bumps | YES |

Cross-project conflicts: X found

Action items:
1. [CRITICAL] web-app: 1 critical Python vulnerability — fix immediately
2. [HIGH] api-service: 2 high vulnerabilities — schedule fix
3. [INFO] 5 projects have major version bumps available
```

## Error Handling

- If audit tools aren't installed, report which are missing and how to install them
- If a project has no lock file, note it (can't audit without one)
- If a project path doesn't exist, skip with "PATH NOT FOUND"
- Never fail the entire audit because one project has an issue
- Time out individual audit commands after 30 seconds

## Notes

- This skill is read-only — it reports vulnerabilities but does not fix them
- For fixing: use `npm audit fix`, `pip install --upgrade`, or manual intervention
- Python audits work best with virtualenvs activated, but can audit requirements.txt directly
- Run this monthly or before major releases
