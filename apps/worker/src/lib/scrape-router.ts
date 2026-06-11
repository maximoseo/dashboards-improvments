export type ScrapeProvider = 'firecrawl' | 'microlink' | 'browser';
export interface ScrapeResult { provider: ScrapeProvider; url: string; markdown?: string; screenshot?: string; evidence_ref: string }

export async function scrapeRouter(url: string): Promise<ScrapeResult> {
  if (process.env.FIRECRAWL_API_KEY) return { provider: 'firecrawl', url, evidence_ref: 'firecrawl:queued' };
  if (process.env.MICROLINK_API_KEY) return { provider: 'microlink', url, evidence_ref: 'microlink:queued' };
  return { provider: 'browser', url, evidence_ref: 'browser:queued' };
}
