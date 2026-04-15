# Agent Configuration

**Settings for the security scanner. Edit these to match your project.**

## Project Paths

Change these to match your folder structure. The agent checks the primary path first, then tries the fallback.

| Layer | Primary | Fallback |
|-------|---------|----------|
| **Frontend** | `src/` | `client/src/` |
| **Backend** | `server/` | `api/` or `backend/` |
| **Reports** | `/security/reports/` | — |

If neither path exists, the agent asks you where your code lives.

## Severity Levels

The scanner classifies every finding into one of three levels:

| Level | What it means | Examples |
|-------|--------------|----------|
| **High** | Critical — fix immediately | Remote code execution, SQL injection, hardcoded secrets |
| **Medium** | Important — fix soon | Data leaks, weak authentication, missing input validation |
| **Low** | Advisory — fix when convenient | Missing security headers, verbose logging, minor config issues |

### What Gets Reported

By default, the scanner reports **high and medium** findings only. Low severity findings are included when the user asks for "full details" or runs a scan with `--all-severities`.

## Watch Mode

| Setting | Default | Description |
|---------|---------|-------------|
| **Polling interval** | 5 seconds | How often the agent checks for file changes |
| **Ignored folders** | `node_modules/`, `.git/`, `dist/`, `build/` | Folders the agent never scans |
| **Concurrent sessions** | 1 | Only one watch session can run at a time. Starting a new one stops the previous |

## Output Preferences

- Summarise findings in 3–5 bullet points — do not print full JSON to chat unless requested
- Always ask before re-scanning if more than 50 files changed at once

## False Positive Handling

These patterns are ignored by default to reduce noise. Remove any line that doesn't apply to your project, or add your own.

| Pattern | Why it's ignored |
|---------|-----------------|
| `dangerouslySetInnerHTML` inside Storybook stories | Test/demo code, not shipped to production |
| `eval()` in Webpack or Vite config files | Build tooling, not application code |
| Hardcoded strings in `*.test.js` or `*.spec.js` | Test fixtures, not real secrets |

## Custom Rules (Optional)

Add your own patterns here. The agent checks these in addition to its built-in rules.

```
# Format: category | severity | regex pattern | description
# Example:
# Auth | high | api[Kk]ey\s*=\s*['"][A-Za-z0-9] | Hardcoded API key assignment
# Logging | low | console\.log\(.*password | Password value logged to console
```

Remove the examples and add your own, or leave this section empty to use built-in rules only.
