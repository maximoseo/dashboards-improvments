import { Drawer } from '@/components/mobile/Drawer';
import { MarkdownExportButton } from '@/components/mobile/MarkdownExportButton';
import { SwipeTabs } from '@/components/mobile/SwipeTabs';

export default function ScanReportPage({ params }: { params: { id: string; scanId: string } }) {
  return <main className="min-h-dvh bg-ink p-4 pb-28 text-white sm:p-8">
    <section className="mx-auto max-w-6xl space-y-5">
      <div className="sticky top-0 z-10 rounded-b-3xl border border-red-400/30 bg-red-950/80 p-4 backdrop-blur">
        <p className="font-semibold">P0 production health banner</p>
        <p className="text-sm text-red-100/80">Appears first when real Sentry or synthetic-flow evidence produces a P0.</p>
      </div>
      <div className="rounded-3xl border border-white/10 bg-panel p-5">
        <p className="text-sm text-aurora">Dashboard {params.id}</p>
        <h1 className="mt-2 text-3xl font-bold">Scan report</h1>
        <p className="mt-2 text-white/70">Scan {params.scanId}. No fabricated findings are rendered.</p>
      </div>
      <SwipeTabs tabs={["Findings", "Competitors", "Backlog", "Artifacts"]} />
      <div className="grid gap-4 md:grid-cols-2">
        <article className="rounded-3xl border border-white/10 bg-panel p-5">
          <h2 className="text-xl font-semibold">Evidence required</h2>
          <p className="mt-2 text-white/70">Finding cards open a mobile bottom-sheet evidence drawer. Empty report means no verified findings.</p>
        </article>
        <Drawer><div className="space-y-2"><h2 className="text-xl font-semibold">Evidence drawer</h2><p className="text-white/70">Screenshots, code refs, metrics and rule IDs will appear here.</p></div></Drawer>
      </div>
      <MarkdownExportButton scanId={params.scanId} />
    </section>
  </main>;
}
