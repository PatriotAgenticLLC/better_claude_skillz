# `/test-coverage` -- Coverage Analysis and Gap Filling

Analyze test coverage and generate missing tests to reach 80%+ coverage.

## Usage

```
/test-coverage
```

## Features

- Runs tests with coverage reporting
- Analyzes coverage-summary.json for under-covered files
- Identifies untested code paths in files below 80% threshold
- Generates unit tests for functions, integration tests for APIs, and E2E tests for critical flows
- Verifies new tests pass after generation
- Shows before/after coverage metrics
- Focuses on happy paths, error handling, edge cases, and boundary conditions

## Installation

Copy to your Claude Code skills directory:

**Linux/macOS:**
```bash
cp -r test-coverage ~/.claude/skills/
```

**Windows PowerShell:**
```powershell
Copy-Item -Recurse test-coverage "$env:USERPROFILE\.claude\skills\"
```

---
**Author:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
