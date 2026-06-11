export default function NewDashboardPage() {
  return <main className="min-h-dvh px-4 pb-28 pt-6">
    <div className="mx-auto max-w-xl">
      <p className="text-sm font-bold text-aurora">Step 1 of 5</p>
      <h1 className="mt-3 text-4xl font-black">Add dashboard</h1>
      <form className="mt-8 space-y-5">
        <label className="block"><span className="font-bold">Name</span><input className="mt-2 min-h-14 w-full rounded-2xl border border-white/10 bg-panel px-4 text-base" placeholder="Client dashboard" /></label>
        <label className="block"><span className="font-bold">URL</span><input className="mt-2 min-h-14 w-full rounded-2xl border border-white/10 bg-panel px-4 text-base" placeholder="https://example.com" /></label>
        <button className="fixed inset-x-4 bottom-4 min-h-14 rounded-2xl bg-violet font-black text-white shadow-glow md:static md:w-full">Continue</button>
      </form>
    </div>
  </main>;
}
