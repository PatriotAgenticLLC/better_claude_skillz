# `/a11y-check` -- Accessibility Checker

Runs WCAG 2.1 AA accessibility audits on frontend projects, combining static code analysis with live URL testing so you catch missing alt text, broken ARIA, and keyboard traps before you ship.

## Usage

```
/a11y-check [--url <url>|--static|--component <path>]
```

## Features

- Static analysis for React/JSX/TSX, HTML, and PHP templates: alt text, form labels, heading hierarchy, ARIA misuse, keyboard handlers, focus indicators, and lang attributes
- Live URL audits via pa11y against the WCAG2AA standard, with a parsed issue-type summary
- Single-component deep audits (semantic HTML, aria-prop forwarding, focusability, screen-reader announcements)
- Severity-ranked report with a WCAG 2.1 AA compliance estimate and a quick-fix checklist
- Read-only by design: it identifies issues but never modifies your code

## Installation

Copy to your Claude Code skills directory:

**Linux/macOS:**
```bash
cp -r a11y-check ~/.claude/skills/
```

**Windows PowerShell:**
```powershell
Copy-Item -Recurse a11y-check "$env:USERPROFILE\.claude\skills\"
```

---
**Author:** Nick Martin, Founder - [PatriotAgentic LLC](https://patriotagentic.com)
**License:** MIT
