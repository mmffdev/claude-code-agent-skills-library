// research.ts
// This file reads all JSON reports in /reports and compiles a dev page.

import fs from 'fs';
import path from 'path';

const reportsDir = path.join(__dirname, 'reports');
const outputFile = path.join(__dirname, 'research-compiled.html');

interface SecurityReport {
  scan_id: string;
  timestamp: string;
  scan_type: string;
  watch_mode: boolean;
  concerns: Array<{ severity: string; description: string }>;
  recommendations: string[];
}

function compileResearchPage() {
  if (!fs.existsSync(reportsDir)) {
    console.log('No reports folder found. Run a scan first.');
    return;
  }

  const files = fs.readdirSync(reportsDir).filter(f => f.endsWith('.json'));
  const reports: SecurityReport[] = [];

  for (const file of files) {
    const content = fs.readFileSync(path.join(reportsDir, file), 'utf-8');
    reports.push(JSON.parse(content));
  }

  const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Security Research Dashboard</title>
  <style>
    body { font-family: sans-serif; margin: 2rem; background: #f5f5f5; }
    .report { background: white; margin-bottom: 2rem; padding: 1rem; border-radius: 8px; }
    .high { color: red; font-weight: bold; }
    .medium { color: orange; }
    .low { color: green; }
  </style>
</head>
<body>
  <h1>Security Research Dashboard</h1>
  <p>Total scans: ${reports.length}</p>
  ${reports.map(r => `
    <div class="report">
      <h3>${r.scan_type} scan · ${new Date(r.timestamp).toLocaleString()}</h3>
      <p>Watch mode: ${r.watch_mode ? 'Yes' : 'No'}</p>
      <h4>Concerns</h4>
      <ul>
        ${r.concerns.map(c => `<li class="${c.severity}">[${c.severity.toUpperCase()}] ${c.description}</li>`).join('')}
      </ul>
      <h4>Recommendations</h4>
      <ul>
        ${r.recommendations.map(rec => `<li>${rec}</li>`).join('')}
      </ul>
    </div>
  `).join('')}
</body>
</html>
  `;

  fs.writeFileSync(outputFile, html);
  console.log(`Compiled research page at ${outputFile}`);
}

compileResearchPage();
