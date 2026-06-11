import Link from 'next/link';

export default function DashboardsPage() {
  return <main className="min-h-dvh bg-ink p-4 pb-28 text-white sm:p-8">
    <section className="mx-auto max-w-5xl space-y-6">
      <div className="rounded-3xl border border-white/10 bg-panel p-5 shadow-glow sm:p-8">
        <p className="text-sm text-aurora">DashAudit</p>
        <h1 className="mt-2 text-3xl font-bold sm:text-5xl">Dashboards</h1>
        <p className="mt-3 text-white/70">No dashboards yet. Empty states stay empty until real user dashboards are registered.</p>
        <Link className="mt-6 inline-flex min-h-14 items-center justify-center rounded-2xl bg-violet px-6 font-semibold" href="/dashboards/new">Add dashboard</Link>
      </div>
    </section>
  </main>;
}
