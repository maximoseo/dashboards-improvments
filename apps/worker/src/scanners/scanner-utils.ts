import { findingSchema, type Finding } from '../lib/zod-guards.js';

export function evidenceFinding(input: Finding): Finding {
  return findingSchema.parse(input);
}

export const noFindings: Finding[] = [];
