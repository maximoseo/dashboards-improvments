export function BottomNav() {
  return <nav aria-label="Primary" className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-ink/90 px-4 py-3 backdrop-blur safe-bottom md:hidden">
    <div className="mx-auto grid max-w-sm grid-cols-3 gap-2 text-sm">
      {['Dashboards', 'Scans', 'Settings'].map((item) => <a key={item} className="min-h-11 rounded-2xl px-3 py-3 text-center text-slate-200 active:bg-white/10" href="#">{item}</a>)}
    </div>
  </nav>;
}
