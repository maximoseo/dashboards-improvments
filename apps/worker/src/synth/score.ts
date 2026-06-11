import type { Finding } from '../lib/zod-guards.js';
export function scoreFindings(findings: Finding[]) {
  const penalty = findings.reduce((sum, f) => sum + ({ P0: 35, P1: 18, P2: 8, P3: 3 }[f.severity] ?? 0), 0);
  return { overall: Math.max(0, 100 - penalty), count: findings.length };
}
