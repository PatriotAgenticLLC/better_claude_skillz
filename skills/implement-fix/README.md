# `/implement-fix` -- TDD Bug Fix Implementation

Implement a bug fix based on a root cause analysis (RCA) document, following test-driven development principles with full verification.

## Usage

```
/implement-fix [rca-file]
```

## Features

- Reads RCA document and follows the documented fix strategy
- Writes a failing test first (TDD) that reproduces the exact bug scenario
- Implements minimal fix, then verifies the test passes
- Runs full test suite to ensure no regressions
- Generates implementation report with before/after test results

## Installation

Copy to your Claude Code skills directory:

**Linux/macOS:**
```bash
cp -r implement-fix ~/.claude/skills/
```

**Windows PowerShell:**
```powershell
Copy-Item -Recurse implement-fix "$env:USERPROFILE\.claude\skills\"
```

---
**Author:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
