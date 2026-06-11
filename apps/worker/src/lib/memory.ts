export async function rememberPattern(dashboardId: string, content: string) { return { dashboardId, content, stored: Boolean(process.env.SUPERMEMORY_API_KEY || process.env.MEM0_API_KEY) }; }
