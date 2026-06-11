export type SearchProvider = 'exa' | 'tavily' | 'perplexity' | 'serpapi';
export interface SearchResult { provider: SearchProvider; title: string; url: string; snippet?: string; evidence_ref: string }

const providers: Array<{ name: SearchProvider; env: string }> = [
  { name: 'exa', env: 'EXA_API_KEY' },
  { name: 'tavily', env: 'TAVILY_API_KEY' },
  { name: 'perplexity', env: 'PERPLEXITY_API_KEY' },
  { name: 'serpapi', env: 'SERPAPI_KEY' },
];

export async function searchRouter(query: string): Promise<SearchResult[]> {
  const provider = providers.find((p) => Boolean(process.env[p.env]));
  if (!provider) return [];
  return [{ provider: provider.name, title: `Search queued: ${query}`, url: 'about:blank', evidence_ref: `${provider.name}:queued` }];
}
