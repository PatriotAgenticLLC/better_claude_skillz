# Default Soft-Skip Patterns by Project Type

Reference library for /optimize-context. These are SOFT SKIPS — files remain
accessible but are not loaded during /prime.

Only patterns for files that would be TRACKED in git belong here.
If .gitignore already handles it, it does not belong here.

## Universal Patterns (Any Project)

### Historical Session Artifacts
```
.claude/handoffs/
.claude/brainstorms/
.claude/code-reviews/
plans/archive/
```
**Why**: Session handoffs, brainstorms, and archived plans accumulate fast in Claude Code projects and are pure history. NEVER exclude the active half of a split directory (e.g. `plans/` itself when active plans live there — exclude only `plans/archive/`).
**Typical savings**: 20K-150K tokens

### Auto-Loaded Claude Config
```
.claude/commands/
.claude/agents/
.claude/rules/
```
**Why**: Claude Code loads these itself (slash commands, agents, rules); reading them again during /prime is redundant.
**Typical savings**: 5K-20K tokens

### Binary Assets & Large Files
```
*.png
*.pdf
*.jpg
```
**Why**: Tracked images, renders, and documents can dominate the byte count. Also flag any single tracked file >100KB found via `git ls-files | xargs wc -c | sort -rn`.
**Typical savings**: highly variable — often the single largest category

### Archives & Deprecated
```
_archive/
old/
deprecated/
```
**Why**: Historical code that shouldn't influence current development.
**Typical savings**: 10K-50K tokens

### Large Documentation
```
docs/api-reference.json
docs/openapi.yaml
CHANGELOG.md           # Only if >500 lines
```
**Why**: Reference docs are valuable but too large to load by default.
**Typical savings**: 5K-50K tokens per file

### Generated Code
```
generated/
*.generated.ts
*.generated.js
prisma/generated/
```
**Why**: Machine-generated, rarely read manually. Source of truth is the schema.
**Typical savings**: 10K-100K tokens

---

## Node.js / TypeScript Projects

### Lock Files (if tracked)
```
package-lock.json
yarn.lock
pnpm-lock.yaml
```
**Why**: Resolved dependency trees. Huge files (10K-50K lines). Source of truth is package.json.
**Typical savings**: 20K-80K tokens
**Note**: Many projects gitignore these. Only add if tracked.

### Minified Assets (if tracked)
```
*.min.js
*.min.css
public/assets/*.js
```
**Why**: Compiled/minified, not human-readable.
**Typical savings**: 5K-30K tokens

---

## Python Projects

### Migration History
```
migrations/
alembic/versions/
db/migrations/
```
**Why**: Dozens of small files. Collectively huge. Current schema is what matters.
**Typical savings**: 5K-30K tokens

### Compiled Bytecode (if tracked for some reason)
```
*.pyc
__pycache__/
```
**Note**: Usually in .gitignore. Only list if tracked.

---

## Docker / Infrastructure Projects

### Large Config Exports
```
n8n/workflows/*.json
```
**Why**: Workflow JSON exports are large machine-readable files.
**Typical savings**: 10K-50K tokens per file

### Data Directories
```
pageindex/data/
data/seeds/
data/fixtures/
```
**Why**: Ingested/indexed data. Large. Source of truth is the ingestion pipeline.
**Typical savings**: 10K-100K tokens

---

## Database Projects

### Seed Data / Dumps
```
db/seed-data.sql
db/dumps/
*.dump
*.sql.gz
```
**Why**: Large SQL files used for database seeding/restore.
**Typical savings**: 10K-100K tokens

### Migration History
```
db/migrations/
```
**Why**: Historical migrations. Current schema matters more.
**Typical savings**: 5K-30K tokens

---

## Monorepo / Large Projects

### Test Fixtures
```
fixtures/
testdata/
__fixtures__/
tests/fixtures/
test/data/
```
**Why**: Large test data files. Rarely need full context.
**Typical savings**: 5K-50K tokens

### Build Configuration
```
webpack.config.js      # Only if >200 lines
rollup.config.js       # Only if >200 lines
```
**Why**: Complex build configs are rarely relevant to feature work.
**Typical savings**: 2K-10K tokens

---

## How to Use This Library

When /optimize-context scans a project:
1. Detect project type(s) from presence of package.json, requirements.txt, etc.
2. Check each pattern category against tracked files
3. Only suggest patterns that match actual files in the project
4. Prefer directory-level patterns over individual file patterns
5. **Verify every pattern with `git ls-files -ci --exclude='PATTERN'`** — the real match count and measured bytes go in the header comment; never infer scope from the pattern text
6. Report measured token savings (matched bytes ÷ 4) per pattern

This library is a starting point, not a ceiling: also scan the project's own conventions (directory names matching `archive|handoff|brainstorm|render|snapshot|deprecated|old`) and its largest tracked files.
