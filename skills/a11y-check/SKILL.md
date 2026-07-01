---
name: a11y-check
description: Run WCAG accessibility audits on frontend projects. Checks HTML semantics, ARIA usage, color contrast, and keyboard navigation patterns.
argument-hint: "[--url <url>|--static|--component <path>]"
---

# Accessibility Checker

Audit frontend projects for WCAG 2.1 AA compliance. Combines static code analysis with live URL testing.

## Supported Frontends

Auto-detects the frontend in the current project. Works with React/JSX/TSX, plain HTML, and PHP templates (for example WordPress themes). Static analysis runs against source files; live analysis runs against a running dev server or a deployed URL.

## Arguments

Parse `$ARGUMENTS`:

- **`--url <url>`:** Run accessibility audit against a live URL
- **`--static`:** Static code analysis only (no live URL needed)
- **`--component <path>`:** Audit a specific component file
- No arguments: auto-detect frontend in current project and run static analysis

## Process

### Mode 1: Static Code Analysis (`--static` or default)

Scan React/HTML/PHP source files for common accessibility issues:

#### Check 1: Image Alt Text
```bash
# Missing alt attributes on images
grep -rn "<img" --include="*.tsx" --include="*.jsx" --include="*.html" --include="*.php" <path> | grep -v "alt=" | head -10

# Empty alt attributes (may be intentional for decorative images)
grep -rn 'alt=""' --include="*.tsx" --include="*.jsx" <path> | head -10
```

#### Check 2: Form Labels
```bash
# Inputs without labels or aria-label
grep -rn "<input\|<select\|<textarea" --include="*.tsx" --include="*.jsx" <path> | grep -v "aria-label\|aria-labelledby\|id=.*label\|<label" | head -10
```

#### Check 3: Heading Hierarchy
```bash
# Find all headings and check order
grep -rn "<h[1-6]\|<H[1-6]" --include="*.tsx" --include="*.jsx" --include="*.html" <path> | head -20
```
Verify headings don't skip levels (h1 -> h3 without h2).

#### Check 4: ARIA Usage
```bash
# Find ARIA attributes
grep -rn "aria-\|role=" --include="*.tsx" --include="*.jsx" <path> | head -20

# Common ARIA mistakes: role="button" without keyboard handler
grep -rn 'role="button"' --include="*.tsx" --include="*.jsx" <path> | grep -v "onClick\|onKeyDown\|onKeyPress" | head -5
```

#### Check 5: Keyboard Navigation
```bash
# Click handlers without keyboard equivalents
grep -rn "onClick" --include="*.tsx" --include="*.jsx" <path> | grep -v "onKeyDown\|onKeyPress\|button\|Button\|<a \|<Link" | head -10

# tabIndex misuse (positive values)
grep -rn "tabIndex=[^0-]" --include="*.tsx" --include="*.jsx" <path> | head -5
```

#### Check 6: Color Contrast (static hints)
```bash
# Find color definitions that might have contrast issues
grep -rn "color:\s*#\|color:\s*rgb\|text-gray-[34]\|text-slate-[34]" --include="*.tsx" --include="*.jsx" --include="*.css" <path> | head -10
```
Note: Full contrast checking requires a live render. Flag light gray text as potential issues.

#### Check 7: Focus Indicators
```bash
# Check for focus style removal
grep -rn "outline:\s*none\|outline:\s*0\|:focus.*outline" --include="*.css" --include="*.tsx" <path> | head -5
```

#### Check 8: Language Attribute
```bash
# Check HTML lang attribute
grep -rn "<html" --include="*.html" --include="*.tsx" --include="*.jsx" <path> | grep -v 'lang=' | head -3
```

### Mode 2: Live URL Audit (`--url`)

If a URL is provided, use the Bash tool to run automated checks:

```bash
# Check if pa11y is installed
npx pa11y --version 2>/dev/null || echo "pa11y not installed"

# Run pa11y audit
npx pa11y <url> --standard WCAG2AA --reporter json 2>/dev/null | python3 -c "
import sys, json
try:
    results = json.load(sys.stdin)
    issues = results if isinstance(results, list) else results.get('issues', [])
    by_type = {}
    for issue in issues:
        t = issue.get('type', 'unknown')
        by_type[t] = by_type.get(t, 0) + 1
    for t, c in sorted(by_type.items()):
        print(f'  {t}: {c}')
    print(f'Total: {len(issues)} issues')
except:
    print('Could not parse pa11y output')
"
```

If pa11y is not available, suggest:
```
Install pa11y for automated WCAG testing:
  npm install -g pa11y

Or use these browser tools:
  - axe DevTools (Chrome extension)
  - WAVE (wave.webaim.org)
  - Lighthouse Accessibility audit (Chrome DevTools > Lighthouse)
```

### Mode 3: Component Audit (`--component`)

Read the specified component file and audit it line by line:

1. Read the file with the Read tool
2. Check for all static analysis patterns above
3. Additionally check:
   - Does the component accept and forward `aria-*` props?
   - Does it use semantic HTML elements (`<button>`, `<nav>`, `<main>`) vs generic `<div>`?
   - Are interactive elements focusable?
   - Does it announce state changes to screen readers?

## Report

```
## Accessibility Audit: <project-name>

### Summary
| Category | Issues | Severity |
|----------|--------|----------|
| Missing alt text | 3 | HIGH |
| Missing form labels | 2 | HIGH |
| Keyboard accessibility | 5 | MEDIUM |
| Heading hierarchy | 1 | LOW |
| Focus indicators | 2 | MEDIUM |
| ARIA misuse | 0 | — |
| Color contrast (potential) | 4 | REVIEW |

### Detailed Findings

#### HIGH: Missing alt text
- `src/components/Hero.tsx:15` — `<img src={logo}>` missing alt attribute
- `src/components/About.tsx:42` — `<img src={photo}>` missing alt attribute

#### MEDIUM: Click handlers without keyboard support
- `src/components/Card.tsx:28` — `<div onClick={...}>` needs onKeyDown + role="button" + tabIndex={0}

### WCAG 2.1 AA Compliance Estimate
Based on static analysis: ~70% compliant (X issues found)
For full compliance, run a live audit with pa11y or axe.

### Quick Fixes
1. Add `alt` attributes to all `<img>` tags (3 files)
2. Add `<label>` elements for form inputs (2 files)
3. Add keyboard handlers to interactive divs (5 files)
```

## Error Handling

- If no frontend found: "No frontend files detected in this project"
- If pa11y not installed: provide installation instructions and browser alternatives
- If URL unreachable: report connection error
- Static analysis always works regardless of tooling

## Notes

- Static analysis catches ~60% of accessibility issues; live testing catches the rest
- Focus on HIGH severity issues first (missing alt text, form labels, keyboard navigation)
- Color contrast requires visual inspection or automated tools like pa11y/axe
- WordPress projects use PHP templates — check `*.php` files instead of JSX
- This skill is read-only — it identifies issues but does not fix them
