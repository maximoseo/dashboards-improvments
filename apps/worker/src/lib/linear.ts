export async function createP0Issue(title: string) { if (!process.env.LINEAR_OAUTH_TOKEN) return { created: false, reason: 'LINEAR_OAUTH_TOKEN missing' }; return { created: true, title }; }
