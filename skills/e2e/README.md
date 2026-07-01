# `/e2e` -- End-to-End Testing with Playwright

Generate and run end-to-end tests with Playwright, including test journey creation, cross-browser execution, artifact capture, and flaky test detection.

## Usage

```
/e2e [description of user flow to test]
```

## Features

- Generates Playwright tests using Page Object Model pattern for maintainability
- Runs tests across Chromium, Firefox, and WebKit browsers
- Captures screenshots, videos, and traces on test failures
- Detects flaky tests and recommends fixes with quarantine strategies
- Produces HTML reports and JUnit XML for CI/CD integration

## Installation

Copy to your Claude Code skills directory:

**Linux/macOS:**
```bash
cp -r e2e ~/.claude/skills/
```

**Windows PowerShell:**
```powershell
Copy-Item -Recurse e2e "$env:USERPROFILE\.claude\skills\"
```

---
**Author:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
