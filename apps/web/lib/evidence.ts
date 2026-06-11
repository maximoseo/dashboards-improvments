import { z } from 'zod';
export const evidenceSchema = z.object({ kind: z.string().min(1), source: z.string().min(1), ref: z.string().min(1) }).passthrough();
export type Evidence = z.infer<typeof evidenceSchema>;
