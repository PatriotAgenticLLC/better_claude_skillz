# `e2e-runner` -- End-to-End Testing Specialist

End-to-end testing specialist using Vercel Agent Browser (preferred) with Playwright fallback. Generates, maintains, and runs E2E tests with proper artifact management and flaky test handling.

## Capabilities

- Create E2E tests for critical user journeys using Agent Browser or Playwright
- Maintain tests as UI changes occur
- Identify and quarantine flaky tests with structured patterns
- Capture and manage artifacts (screenshots, videos, traces)
- Integrate with CI/CD pipelines (GitHub Actions)
- Generate detailed HTML test reports and JUnit XML
- Apply Page Object Model pattern for maintainable tests

## Tools Used

`Read`, `Write`, `Edit`, `Bash`, `Grep`, `Glob`

## Model

Recommended: `opus`

## When to Use

- Testing critical user flows (authentication, checkout, search)
- Setting up E2E testing infrastructure
- Debugging flaky tests
- Adding test coverage for new features
- Configuring CI/CD test pipelines

## Installation

Copy to your Claude Code agents directory:

**Linux/macOS:**
```bash
mkdir -p ~/.claude/agents/
cp e2e-runner.md ~/.claude/agents/
```

**Windows PowerShell:**
```powershell
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.claude\agents"
Copy-Item e2e-runner.md "$env:USERPROFILE\.claude\agents\"
```

---
**Author:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
