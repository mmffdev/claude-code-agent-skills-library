# Security Audit Skill + Agent

**Copyright (c) 2026 MMFFDev. All rights reserved.**

## Overview

This is a security scanner that runs inside Claude Code. It checks your application for common security problems — things like unsafe user input handling, exposed passwords, and misconfigured APIs — then writes a report telling you exactly what it found and how to fix each issue.

You don't need to understand security to use it. Type a shortcut, the agent scans your code, and you get a plain-language report.

## Who This Is For

- Developers who want security checks without leaving Claude Code
- Teams that need simple, auditable security reports
- Anyone building web apps who wants to catch common mistakes early
- Tech leads tracking security posture over time

## What You Need

Before installing, make sure you have:

- **Claude Code** with file read access enabled
- **A web project** using React and Node/Express (or similar)
- **Node.js** — only needed if you want to generate the HTML dashboard (optional)

## Installation

**Step 1** — Place these files and folders inside the `Agent-Security-Audit/` directory at your project root:

| File | What it does |
|------|-------------|
| `Agent-Security-Audit/config.md` | Small trigger file — tells Claude Code the skill exists |
| `Agent-Security-Audit/c_securityAudit.md` | The full scan instructions the agent follows |
| `Agent-Security-Audit/agent-config.md` | Your settings (folder paths, severity filters, etc.) |
| `Agent-Security-Audit/security/research.ts` | Optional — generates an HTML dashboard from your reports |

**Step 2** — That's it. No packages to install, no configuration needed. The scanner is ready to use.

After install, your project will look like this:

```
your-project/
├── README.md
├── Agent-Security-Audit/
│     ├── config.md                # Trigger file
│     ├── c_securityAudit.md       # Scan instructions
│     ├── agent-config.md          # Settings
│     └── security/
│          ├── reports/            # Reports appear here automatically
│          │     └── *.json
│          └── research.ts         # Optional HTML dashboard generator
```

## How to Use It

### Running a Scan

Type any of these shortcuts into Claude Code:

| Shortcut | What it scans |
|----------|--------------|
| `<sec_front>` | Your frontend code (React components, user-facing pages) |
| `<sec_back>` | Your backend code (server, database queries, file handling) |
| `<sec_api>` | Your API routes (authentication, input validation, permissions) |
| `<sec_pen>` | Penetration test concerns (exposed secrets, debug endpoints, information leakage) |
| `<sec_full>` | All of the above |

### Watch Mode

Add `--watch` to any shortcut to keep the agent running in the background:

```
<sec_full> --watch
```

The agent scans once, then automatically re-scans every time you save a file. Type `stop watching` or press `Ctrl+C` to stop.

### Example: What a Scan Looks Like

**A quick API scan:**
```
You: <sec_api>
Agent: Scanning your API routes. Using default folder 'routes/'. Okay?
You: Yes
Agent: Found 2 concerns.
       High: JWT secret hardcoded in auth.js line 14.
       Medium: No input validation on /api/user/update.
       Report saved.
```

**A full scan with watch mode:**
```
You: <sec_full> --watch
Agent: Full scan complete. 5 concerns found. Watching for changes now.
(every time you save a file, the agent re-scans and saves a new report)
```

**A frontend-only scan:**
```
You: <sec_front>
Agent: Frontend scan complete. Found 3 high-severity concerns.
       Report saved to Agent-Security-Audit/security/reports/frontend_scan_2026-04-15T10-30-00.json
       Most critical: CommentBox.jsx line 42 uses dangerouslySetInnerHTML
       with user input.
```

### Talking to the Agent

The agent may ask you questions during a scan:

- "Where is your frontend source folder?"
- "Are there any files I should ignore?"
- "Do you have any known false positives?"

Just answer naturally. The agent remembers your answers for the rest of the session.

You can also ask the agent questions at any time:

- "What did you find in the last scan?"
- "Explain that vulnerability to me"
- "How do I fix the SQL injection issue?"

It responds in plain language unless you ask for technical details.

## Understanding Reports

### Where Reports Go

Every scan creates a JSON report in:

```
Agent-Security-Audit/security/reports/
```

Files are named by scan type and timestamp, e.g. `frontend_scan_2026-04-15T10-30-00.json`.

### What's In a Report

Each report tells you:

| Section | What it means |
|---------|--------------|
| **Coverage** | How many files were scanned, how many lines were checked, and how many rules were applied |
| **What's great** | Things you're already doing right (secure patterns the scanner found) |
| **Concerns** | Each problem found — with severity (high/medium/low), the exact file and line number, a description of the issue, and a recommendation to fix it |
| **Recommendations** | A summary of the most important actions to take |
| **Pen test notes** | Anything an attacker could potentially exploit |

### Example Report

```json
{
  "scan_id": "frontend_2026-04-15T10-30-00",
  "timestamp": "2026-04-15T10:30:00Z",
  "scan_type": "frontend",
  "watch_mode": false,
  "coverage": {
    "files_scanned": 24,
    "lines_analyzed": 3420,
    "rules_applied": 12
  },
  "whats_great": [
    "Uses environment variables for API keys",
    "Helmet.js middleware present"
  ],
  "concerns": [
    {
      "severity": "high",
      "category": "XSS",
      "file": "src/components/CommentBox.jsx",
      "line": 42,
      "description": "Uses dangerouslySetInnerHTML with user-generated content",
      "recommendation": "Use DOMPurify or rewrite with safe React children"
    }
  ],
  "recommendations": [
    "Add CSRF protection to all state-changing requests",
    "Implement rate limiting on /api/login"
  ],
  "pen_test_notes": [
    "Exposed /api/status returns server version info"
  ]
}
```

### HTML Dashboard (Optional)

To view all your reports in a single web page, run:

```bash
npx ts-node Agent-Security-Audit/security/research.ts
```

This generates `research-compiled.html` — a page showing all scans, concerns grouped by severity, and recommendations. Open it in any browser.

### Demo Report

After you run a scan, you will find a report like this in `Agent-Security-Audit/security/reports/`:

```
/Agent-Security-Audit/security/reports/full_scan_2026-04-15T10-30-00.json
```

Open it in any text editor or JSON viewer. It contains example findings across all severity levels (high, medium, low) with realistic file paths, line numbers, and fix recommendations.

## Customisation

Edit `Agent-Security-Audit/agent-config.md` to change:

- **Default folder paths** — where the scanner looks for your code
- **Severity filters** — which severity levels to include in reports
- **Watch mode frequency** — how often it re-scans in watch mode

## How It Works Behind the Scenes

When you type a shortcut:

1. Claude reads `Agent-Security-Audit/config.md` — a small trigger file
2. Claude loads `Agent-Security-Audit/c_securityAudit.md` — the full scan instructions
3. The agent runs the scan against your code
4. A JSON report is saved to `Agent-Security-Audit/security/reports/`

Nothing is loaded into memory until you actually run a security command. This keeps Claude Code fast when you're not using the scanner.

## Technical Reference: What the Scanner Checks

This section is for developers who want to know exactly what rules the scanner applies.

### Frontend Checks

| What it looks for | Why it matters |
|-------------------|---------------|
| `dangerouslySetInnerHTML` usage | Can allow attackers to inject malicious scripts into your pages |
| `eval()` or `Function()` calls | Executes arbitrary code — a major attack vector |
| Direct `innerHTML` assignments | Same risk as dangerouslySetInnerHTML, bypasses React's protections |
| Missing CSRF tokens in forms | Attackers can trick users into submitting forms on your site |
| Tokens stored in `localStorage` | Accessible to any script on the page — use httpOnly cookies instead |

### Backend Checks

| What it looks for | Why it matters |
|-------------------|---------------|
| String concatenation in SQL queries | Allows attackers to manipulate your database (SQL injection) |
| `exec()` or `spawn()` with user input | Allows attackers to run commands on your server |
| File paths with `../` patterns | Allows attackers to read files outside your app directory |
| Routes missing authentication | Exposes private data or actions to unauthenticated users |
| No rate limiting on auth endpoints | Allows brute-force password attacks |

### API Checks

| What it looks for | Why it matters |
|-------------------|---------------|
| JWT without expiration or signature validation | Tokens that never expire or can be forged |
| Missing input validation | Allows malformed or malicious data through your API |
| CORS set to `*` (allow all origins) | Any website can make requests to your API |
| Error messages exposing stack traces | Reveals internal code structure to attackers |

## Tech Stack Assumptions

| Layer | Expected files |
|-------|---------------|
| **Frontend** | React components in `.jsx` or `.tsx` |
| **Backend** | Node.js with Express in `.js` or `.ts` |
| **API** | REST APIs following typical Express patterns |

If your stack differs, the agent asks for clarification and adapts.

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Agent says "folder not found" | Tell it where your code lives. Example: "My frontend is in client/src" |
| Too many false positives | Edit `Agent-Security-Audit/agent-config.md` and lower the priority of low severity issues |
| Watch mode stops unexpectedly | Restart with the shortcut + `--watch` again |
| Agent not responding to shortcuts | Make sure `Agent-Security-Audit/config.md` is in your project root and Claude Code can see it |
| Reports not showing in dashboard | Check that `Agent-Security-Audit/security/research.ts` is pointing to the correct reports folder path |

## Version

**Current version**: 1.0

Works with any Claude Code instance that can read local files.
