type BrowserBackend = 'browserbase' | 'hyperbrowser' | 'browserless';
export interface BrowserSession { backend: BrowserBackend; sessionId: string; url?: string }
export interface BrowserProvider { name: BrowserBackend; available(): boolean; createSession(): Promise<BrowserSession> }

const providers: BrowserProvider[] = [
  { name: 'browserbase', available: () => Boolean(process.env.BROWSERBASE_API_KEY && process.env.BROWSERBASE_PROJECT_ID), createSession: async () => ({ backend: 'browserbase', sessionId: 'pending-browserbase-api' }) },
  { name: 'hyperbrowser', available: () => Boolean(process.env.HYPERBROWSER_API_KEY), createSession: async () => ({ backend: 'hyperbrowser', sessionId: 'pending-hyperbrowser-api' }) },
  { name: 'browserless', available: () => Boolean(process.env.BROWSERLESS_API_KEY), createSession: async () => ({ backend: 'browserless', sessionId: 'pending-browserless-api' }) },
];

export async function createBrowserSession(): Promise<BrowserSession> {
  const order = (process.env.BROWSER_BACKEND?.split(',') as BrowserBackend[] | undefined) ?? ['browserbase', 'hyperbrowser', 'browserless'];
  for (const name of order) {
    const provider = providers.find(p => p.name === name);
    if (provider?.available()) return provider.createSession();
  }
  throw new Error('No cloud browser backend configured');
}
