import { NextResponse } from 'next/server';
import { z } from 'zod';

const startScanSchema = z.object({ dashboardId: z.string().uuid(), scope: z.array(z.string()).default([]) });

export async function POST(request: Request) {
  const body = startScanSchema.safeParse(await request.json());
  if (!body.success) return NextResponse.json({ error: 'INVALID_REQUEST', issues: body.error.issues }, { status: 400 });
  return NextResponse.json({ status: 'queued', dashboardId: body.data.dashboardId, scope: body.data.scope });
}
