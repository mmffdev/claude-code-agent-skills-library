# Security Audit Skill + Agent for Claude Code

A security scanner that lives inside Claude Code. It checks your React + Node/Express app for vulnerabilities, writes JSON reports, and can watch for code changes.

## What it does

- Scans frontend (React) for XSS, unsafe DOM manipulation, CSRF issues
- Scans backend (Node/Express) for SQL injection, command injection, path traversal
- Scans APIs for JWT problems, missing validation, CORS mistakes
- Reviews penetration testing concerns (exposed secrets, debug endpoints)
- Creates timestamped JSON reports
- Can watch your code and re-scan automatically

## How to install

1. Copy these files into your project root:
   - `config.md`
   - `c_securityAudit.md`
   - `agent-config.md`
   - `dev-mode/security/research.ts`

2. Make sure Claude Code has access to read your project files.

3. That's it. No dependencies to install.

## How to use

Type any shortcut in Claude Code:

| Shortcut | What it scans |
|----------|----------------|
| `<sec_front>` | React frontend only |
| `<sec_back>` | Node backend only |
| `<sec_pen>` | Pen test concerns |
| `<sec_api>` | API routes |
| `<sec_full>` | Everything |

Add `--watch` to keep it running:
