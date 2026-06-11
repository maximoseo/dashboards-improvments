import { BottomNav } from '@/components/mobile/BottomNav';
import { SwipeTabs } from '@/components/mobile/SwipeTabs';

const dimensions = ['Evidence', 'Mobile', 'Security', 'SEO', 'Code'];

export default function HomePage() {
  return <main className="relative min-h-dvh overflow-hidden px-4 pb-28 pt-6 sm:px-6 lg:px-8">
    <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,.35),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(189,252,255,.16),transparent_30%)]" />
    <section className="mx-auto flex max-w-6xl flex-col gap-8 py-10 md:grid md:grid-cols-[1.1fr_.9fr] md:items-center md:py-20">
      <div>
        <p className="mb-4 inline-flex min-h-11 items-center rounded-full border border-violet/40 bg-violet/10 px-4 text-sm font-bold text-aurora">Read-only audits. Real evidence only.</p>
        <h1 className="text-balance text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">DashAudit finds dashboard problems you can prove.</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">Register a target dashboard, connect optional integrations, and run cloud-browser scans that cite screenshots, metrics, source lines, and rule IDs for every finding.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="/dashboards/new" className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-violet px-6 text-base font-black text-white shadow-glow">Start dashboard audit</a>
          <a href="#principles" className="inline-flex min-h-14 items-center justify-center rounded-2xl border border-white/15 px-6 text-base font-bold text-slate-100">View guardrails</a>
        </div>
      </div>
      <div className="rounded-[2rem] border border-white/10 bg-white/[.04] p-4 shadow-glow backdrop-blur">
        <SwipeTabs tabs={dimensions} />
        <div className="mt-4 space-y-3">
          {dimensions.map((dimension, index) => <article key={dimension} className="rounded-3xl border border-white/10 bg-ink/80 p-4">
            <div className="flex items-center justify-between gap-3"><h2 className="font-bold">{dimension} scan</h2><span className="rounded-full bg-aurora/10 px-3 py-1 text-sm text-aurora">P{index % 3}</span></div>
            <p className="mt-2 text-sm leading-6 text-slate-400">Empty until a real scanner returns Zod-valid findings with non-null evidence.</p>
          </article>)}
        </div>
      </div>
    </section>
    <section id="principles" className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
      {['No mock data', 'Evidence required', 'Mobile-first'].map((item) => <div key={item} className="rounded-3xl border border-white/10 bg-panel p-5"><h3 className="text-xl font-black">{item}</h3><p className="mt-2 text-slate-400">Built into schema, CI, and UI acceptance gates from PR #1.</p></div>)}
    </section>
    <BottomNav />
  </main>;
}
