import type { Finding } from './zod-guards.js';

type JobStatus = 'queued' | 'running' | 'done' | 'failed';
export interface ScanJob { id: string; dashboard_id: string; status: JobStatus; progress: Record<string, unknown>; findings: Finding[] }

const jobs = new Map<string, ScanJob>();

export function enqueueScan(dashboard_id: string): ScanJob {
  const job: ScanJob = { id: crypto.randomUUID(), dashboard_id, status: 'queued', progress: {}, findings: [] };
  jobs.set(job.id, job);
  return job;
}

export function nextQueuedJob(): ScanJob | undefined {
  return [...jobs.values()].find((job) => job.status === 'queued');
}

export function updateJob(id: string, patch: Partial<ScanJob>) {
  const job = jobs.get(id);
  if (!job) throw new Error(`Job ${id} not found`);
  const updated = { ...job, ...patch };
  jobs.set(id, updated);
  return updated;
}

export function getJob(id: string) { return jobs.get(id); }
