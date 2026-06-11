import { z } from 'zod';

export const evidenceRefSchema = z.object({
  kind: z.enum(['screenshot', 'code', 'metric', 'rule', 'sentry', 'competitor', 'artifact']),
  source: z.string().min(1),
  ref: z.string().min(1),
  bbox: z.object({ x: z.number(), y: z.number(), w: z.number(), h: z.number() }).optional(),
  value: z.union([z.string(), z.number(), z.boolean()]).optional(),
});

export const findingSchema = z.object({
  dimension: z.string().min(1),
  severity: z.enum(['P0', 'P1', 'P2', 'P3']),
  title: z.string().min(1),
  description_md: z.string().min(1),
  evidence: z.array(evidenceRefSchema).min(1),
  recommendation_md: z.string().min(1),
  effort: z.number().int().min(1).max(5).default(1),
  impact: z.number().int().min(1).max(5).default(1),
});

export type Finding = z.infer<typeof findingSchema>;
export function parseFindings(input: unknown): Finding[] {
  return z.array(findingSchema).parse(input);
}
