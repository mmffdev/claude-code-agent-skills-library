# Agent Configuration

## Default Paths
- Frontend source: `src/` (fallback: `client/src/`)
- Backend source: `server/` (fallback: `api/` or `backend/`)
- Reports directory: `dev-mode/security/reports/`

## Scan Rules Priority
1. High severity: Critical vulnerabilities (RCE, SQLi, hardcoded secrets)
2. Medium severity: Data leaks, weak auth, missing validation
3. Low severity: Missing headers, verbose logging

## Watch Mode Behavior
- Polling interval: 2 seconds
- Ignored folders: `node_modules/`, `.git/`, `dist/`, `build/`
- Maximum concurrent watch sessions: 1

## Output Preferences
- Do not print full JSON to chat unless requested
- Summarize findings in 3-5 bullet points
- Always ask before re-scanning if more than 50 files changed

## Severity Thresholds
- Report only high and medium by default
- Include low severity only if user asks for "full details"

## False Positive Handling
- Common patterns to ignore:
  - `dangerouslySetInnerHTML` inside Storybook stories
  - `eval()` in Webpack config files
  - Hardcoded secrets in test files (files ending with `.test.js` or `.spec.js`)

## Custom Rules
You can add custom regex patterns here. Example:
