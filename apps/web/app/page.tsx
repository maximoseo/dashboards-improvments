import { SwipeTabs } from '@/components/mobile/SwipeTabs';

const dimensions = ['Evidence', 'Mobile', 'Security', 'SEO', 'Code'];
const previewFindings = [
  'Mobile nav overlaps chart controls at 390px — screenshot and bbox captured.',
  'Dashboard load exceeds target on /reports — Lighthouse audit and metric attached.',
  'Missing CSP header on production response — rule ID and header snapshot saved.',
  'Duplicate H1 on settings screen — rendered HTML evidence linked.',
  'Potential exposed client env key — source path and line reference required.',
];
const principles = [
  ['No mock data', 'DashAudit starts empty and only creates findings when a scanner captures real evidence.'],
  ['Evidence required', 'Every issue must cite a screenshot, metric, rule ID, source line, Sentry issue, or competitor quote.'],
  ['Mobile-first', 'Buyer flows are checked at 360px and 390px with large tap targets and no horizontal scroll.'],
];

export default function HomePage() {
  return <main className="relative min-h-dvh overflow-hidden px-4 pb-12 pt-6 sm:px-6 lg:px-8">
    <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,.35),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(189,252,255,.16),transparent_30%)]" />
    <section className="mx-auto flex max-w-6xl flex-col gap-8 py-8 md:grid md:grid-cols-[1.1fr_.9fr] md:items-center md:py-20">
      <div>
        <p className="mb-4 inline-flex min-h-11 items-center rounded-full border border-violet/40 bg-violet/10 px-4 text-sm font-bold text-aurora">Read-only audits. Real evidence only.</p>
        <h1 className="text-balance text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl">DashAudit finds dashboard problems you can prove.</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">Connect a dashboard and run read-only scans. DashAudit captures screenshots, performance metrics, source references, and rule IDs for every finding.</p>
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
            <p className="mt-2 text-sm leading-6 text-slate-300">{previewFindings[index]}</p>
          </article>)}
        </div>
      </div>
    </section>
    <section id="principles" className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
      {principles.map(([title, body]) => <div key={title} className="rounded-3xl border border-white/10 bg-panel p-5"><h3 className="text-xl font-black">{title}</h3><p className="mt-2 text-slate-300">{body}</p></div>)}
    </section>
  </main>;
}
