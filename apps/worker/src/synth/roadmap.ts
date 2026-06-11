import type { Finding } from '../lib/zod-guards.js';
export function buildRoadmap(findings: Finding[]) {
  return findings.map((f) => ({ severity: f.severity, title: f.title, evidence_refs: f.evidence.map((e) => e.ref) }));
}
