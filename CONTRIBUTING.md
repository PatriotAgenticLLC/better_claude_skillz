# Contributing to Shared Skillz

Thank you for considering contributing to this Claude Code skills repository! This document provides guidelines for submitting high-quality skills.

## 📋 Submission Checklist

Before submitting a skill, ensure it meets these requirements:

### Documentation (Required)
- [ ] `README.md` — Complete feature documentation
- [ ] `INSTALL.md` — Step-by-step installation guide
- [ ] `CHANGELOG.md` — Version history
- [ ] `VERSION` — Semantic version number (e.g., `1.0.0`)
- [ ] `SKILL.md` — Main skill definition

### Testing (Required)
- [ ] Tested on at least one real project
- [ ] Works as documented
- [ ] Error cases handled gracefully
- [ ] Platform compatibility verified

### Quality (Required)
- [ ] Clear, concise documentation
- [ ] Example files or templates (if applicable)
- [ ] No hardcoded paths or personal information
- [ ] Follows repository structure guidelines

## 📁 Skill Structure

Required file structure for each skill:

```
your-skill-name/
├── README.md           # Full documentation (see template below)
├── INSTALL.md          # Installation guide
├── SKILL.md            # Skill definition (Claude Code format)
├── CHANGELOG.md        # Version history
├── VERSION             # Current version number (e.g., 1.0.0)
├── example.*           # Example files (optional but recommended)
└── reference.md        # Additional docs (optional)
```

## 📝 README.md Template

Your skill's README should include:

```markdown
# `/your-skill-name` — Brief Description

One-line summary of what the skill does and key benefit.

## Overview

Detailed description of:
- What problem it solves
- How it works
- Key features
- Token savings or performance benefits (if applicable)

## Key Features

- Feature 1
- Feature 2
- Feature 3

## Installation

### Quick Install
\`\`\`bash
cp -r your-skill-name ~/.claude/skills/
\`\`\`

See [INSTALL.md](INSTALL.md) for detailed instructions.

## Usage

### Basic Usage
\`\`\`
/your-skill-name [arguments]
\`\`\`

### Examples

Example 1: [Description]
\`\`\`
/your-skill-name example-arg
\`\`\`

Example 2: [Description]
\`\`\`
/your-skill-name another-example
\`\`\`

## Configuration

(If applicable)

## FAQ

### Q: Common question?
**A:** Answer

## Troubleshooting

Common issues and solutions

## Version History

See [CHANGELOG.md](CHANGELOG.md)

## License

(If different from repository license)
```

## 🔄 Versioning

Follow [Semantic Versioning](https://semver.org/):

- **Major (1.0.0)**: Breaking changes
- **Minor (0.1.0)**: New features, backward compatible
- **Patch (0.0.1)**: Bug fixes

Update both `VERSION` file and `CHANGELOG.md` for each release.

## 🌐 Platform Compatibility

Test on multiple platforms when possible:
- ✅ Linux (Ubuntu/Debian)
- ✅ macOS
- ✅ Windows (PowerShell)

If platform-specific:
- Clearly document platform requirements
- Provide alternatives or workarounds
- Test on the target platform

## 🚀 Submission Process

### 1. Fork the Repository

```bash
# Fork on GitHub, then:
git clone https://github.com/YOUR-USERNAME/better_claude_skillz.git
cd better_claude_skillz
```

### 2. Create Your Skill Directory

```bash
mkdir your-skill-name
cd your-skill-name
```

### 3. Add Required Files

Create all required files (README.md, INSTALL.md, SKILL.md, etc.)

### 4. Test Thoroughly

- Install the skill on a fresh Claude Code setup
- Test all documented use cases
- Verify examples work as documented
- Check error handling

### 5. Update Repository README

Add your skill to the main README.md:
- Add to "Available Skills" section
- Update skill count
- Add to metrics table

### 6. Commit and Push

```bash
git add your-skill-name/
git commit -m "feat: add /your-skill-name skill"
git push origin main
```

### 7. Create Pull Request

Submit PR with:
- **Title**: `feat: add /your-skill-name skill`
- **Description**:
  - What the skill does
  - Why it's useful
  - Token savings or performance benefits
  - Platform compatibility
  - Testing details

## ✅ Review Criteria

Your submission will be reviewed for:

### Functionality
- Does it work as documented?
- Are all features implemented?
- Does it handle errors gracefully?

### Documentation
- Is it clear and comprehensive?
- Are examples accurate and helpful?
- Is installation straightforward?

### Code Quality
- Is the SKILL.md well-structured?
- Are instructions unambiguous?
- Is it maintainable?

### Repository Standards
- Follows file structure guidelines?
- Includes all required files?
- Versioning is correct?

## 🎨 Style Guidelines

### Documentation
- Use clear, concise language
- Include code examples
- Add emoji sparingly for visual hierarchy (📋 sections, ✅ lists, 🚀 actions)
- Use tables for comparisons
- Format code blocks with language tags

### Naming Conventions
- Skill names: lowercase-with-hyphens
- Slash commands: `/lowercase-with-hyphens`
- Files: PascalCase for docs (README.md), lowercase for examples

### Markdown Formatting
- Use `## ` for main sections
- Use `### ` for subsections
- Code inline: \`command\`
- Code blocks: \`\`\`language\`\`\`
- Links: `[text](url)`

## 🐛 Bug Reports

Found a bug in an existing skill?

1. Check existing issues first
2. Create a new issue with:
   - Skill name and version
   - Description of the bug
   - Steps to reproduce
   - Expected vs actual behavior
   - Platform and Claude Code version

## 💡 Feature Requests

Have an idea for an existing skill?

1. Check if it's already requested
2. Create a feature request issue with:
   - Skill name
   - Feature description
   - Use case / benefit
   - Example usage

## 📞 Questions?

- **General questions**: [GitHub Discussions](https://github.com/PatriotAgenticLLC/better_claude_skillz/discussions)
- **Bugs**: [GitHub Issues](https://github.com/PatriotAgenticLLC/better_claude_skillz/issues)
- **Pull requests**: Submit and tag maintainers for review

## 🙏 Thank You!

Your contributions make Claude Code more powerful for everyone. We appreciate:
- Clear documentation
- Thorough testing
- Thoughtful design
- Community support

---

**Happy skill building!** 🚀
