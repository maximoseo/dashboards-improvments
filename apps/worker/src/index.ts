import { parseFindings } from './lib/zod-guards.js';
import { scoreFindings } from './synth/score.js';
import { buildRoadmap } from './synth/roadmap.js';

export async function runOnce() {
  const findings = parseFindings([]);
  return { status: 'idle', scores: scoreFindings(findings), roadmap: buildRoadmap(findings) };
}

runOnce().then((result) => console.log(JSON.stringify(result))).catch((error) => { console.error(error); process.exit(1); });
