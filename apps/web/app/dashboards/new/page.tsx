const integrationFields = ['GitHub repo/read token', 'Supabase project/service role', 'Render service/API key', 'Sentry DSN/token', 'Linear workspace', 'SEMrush/Ahrefs/DataForSEO'];

export default function NewDashboardPage() {
  return <main className="min-h-dvh bg-ink px-4 pb-32 pt-6 text-white sm:px-8">
    <section className="mx-auto max-w-3xl space-y-5">
      <div className="rounded-3xl border border-white/10 bg-panel p-5 shadow-glow sm:p-8">
        <p className="text-sm text-aurora">Step 1 of 5</p>
        <h1 className="mt-2 text-3xl font-bold">Add dashboard</h1>
        <p className="mt-3 text-white/70">Credentials are encrypted server-side. No pasted secret is logged or rendered back.</p>
      </div>
      <form className="space-y-4">
        {['Dashboard name', 'Target URL', 'Login URL', 'Success selector', 'Username', 'Password'].map((label) => <label key={label} className="block rounded-2xl border border-white/10 bg-panel p-4"><span className="text-sm text-white/70">{label}</span><input className="mt-2 min-h-14 w-full rounded-xl border border-white/10 bg-black/30 px-4 text-base outline-none focus:border-aurora" type={label === 'Password' ? 'password' : 'text'} /></label>)}
        <div className="rounded-2xl border border-white/10 bg-panel p-4"><h2 className="font-semibold">Optional integrations</h2><div className="mt-3 grid gap-3">{integrationFields.map((name) => <label key={name} className="flex min-h-11 items-center gap-3 rounded-xl bg-black/20 px-3"><input type="checkbox" /> <span>{name}</span></label>)}</div></div>
      </form>
    </section>
    <div className="safe-bottom fixed inset-x-0 bottom-0 border-t border-white/10 bg-ink/95 p-4 backdrop-blur"><button className="min-h-14 w-full rounded-2xl bg-violet font-semibold">Review & save encrypted dashboard</button></div>
  </main>;
}
