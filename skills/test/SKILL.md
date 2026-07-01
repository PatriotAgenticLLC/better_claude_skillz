---
name: test
description: Universal test runner. Auto-detects project type and runs the appropriate test suite with optional scope and coverage flags.
argument-hint: "[--unit|--integration|--e2e|--coverage|<path>]"
---

# Universal Test Runner

Auto-detect the project type and run the appropriate test suite. Works across Python, Node.js, and Go projects.

## Detection Logic

Detect the project type by checking for manifest files in the current working directory. Check in this order (first match wins):

1. **Go:** `go.mod` exists
2. **Python:** `pytest.ini`, `pyproject.toml` (with `[tool.pytest]`), or `setup.py` exists
3. **Node.js:** `package.json` exists — then check:
   - If `vitest` in devDependencies -> vitest project
   - If `jest` in devDependencies -> jest project
   - If test script defined in `scripts.test` -> use that

Also detect the package manager for Node.js projects:
- `pnpm-lock.yaml` exists -> pnpm
- `yarn.lock` exists -> yarn
- `bun.lockb` exists -> bun
- Otherwise -> npm

## Arguments

Parse `$ARGUMENTS` for flags and positional arguments:

- **No arguments:** Run the default test suite
- **`--unit`:** Run only unit tests
- **`--integration`:** Run only integration tests
- **`--e2e`:** Run only E2E tests
- **`--coverage`:** Run with coverage reporting
- **`<path>`:** Run tests for a specific file or directory
- Flags can be combined: `/test --unit --coverage`

## Test Commands by Project Type

### Python (pytest)

| Flag | Command |
|------|---------|
| (default) | `pytest tests/ -v` |
| `--unit` | `pytest tests/unit/ -v` (or `pytest -m unit -v`) |
| `--integration` | `pytest tests/integration/ -v` (or `pytest -m integration -v`) |
| `--e2e` | `pytest tests/e2e/ -v` (or `pytest -m e2e -v`) |
| `--coverage` | `pytest tests/ -v --cov=. --cov-report=term-missing` |
| `<path>` | `pytest <path> -v` |

**Detection refinements for Python:**
1. Check if `tests/unit/` and `tests/integration/` directories exist
2. If they exist, use directory-based scoping
3. If not, check `pytest.ini` or `pyproject.toml` for markers and use `-m` flag
4. If the project uses markers, report which markers are available

### Node.js (vitest/jest)

| Flag | Command |
|------|---------|
| (default) | `<pm> test` (using detected package manager) |
| `--unit` | `<pm> test -- --testPathPattern="unit"` or `<pm> run test:unit` if script exists |
| `--integration` | `<pm> run test:integration` if script exists, else `<pm> test -- --testPathPattern="integration"` |
| `--e2e` | `<pm> run test:e2e` if script exists, else check for Playwright: `npx playwright test` |
| `--coverage` | `<pm> test -- --coverage` |
| `<path>` | `<pm> test -- <path>` |

**Detection refinements for Node.js:**
1. Read `package.json` scripts section for existing test commands (`test:unit`, `test:e2e`, `test:integration`, `test:coverage`)
2. If specific scripts exist, prefer those over generic flags
3. Check for Playwright config (`playwright.config.ts`/`.js`) for E2E
4. Report available test scripts from package.json

### Go

| Flag | Command |
|------|---------|
| (default) | `go test ./... -v` |
| `--unit` | `go test ./... -v -short` (skip long-running tests) |
| `--integration` | `go test ./... -v -run Integration` |
| `--e2e` | `go test ./... -v -run E2E` |
| `--coverage` | `go test ./... -v -cover -coverprofile=coverage.out && go tool cover -func=coverage.out` |
| `<path>` | `go test <path> -v` |

## Execution

1. **Detect** the project type and report it:
   ```
   Detected: Python/pytest project
   ```

2. **Build** the command based on arguments

3. **Check for project-specific overrides** in CLAUDE.md:
   - Look for a "Testing" or "Test" section
   - If CLAUDE.md specifies custom test commands, prefer those
   - Report: "Using custom test command from CLAUDE.md" if applicable

4. **Run** the test command using Bash tool
   - For long-running test suites (e2e, full integration), suggest tmux but run directly
   - Stream output so the user can see progress

5. **Report** results:
   ```
   Tests: X passed, Y failed, Z skipped
   Coverage: N% (if --coverage)
   Duration: Xs
   ```

## Error Handling

- If no manifest files found: report "Could not detect project type. No manifest files found in current directory."
- If test directory doesn't exist for the requested scope: report which scopes are available
- If tests fail: show the failure summary but don't treat it as a skill error

## Notes

- This skill wraps existing project test infrastructure — it does not install test frameworks
- For projects with both Python and Node.js tests (e.g., a monorepo with a Python backend and a JS frontend), detect both and ask which to run, or run both if no scope flag is given
- Always respect the project's existing test configuration (pytest.ini, vitest.config.ts, etc.)
