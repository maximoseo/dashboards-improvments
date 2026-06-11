export function SwipeTabs({ tabs }: { tabs: string[] }) {
  return <div className="flex snap-x gap-2 overflow-x-auto pb-2" role="tablist">{tabs.map((tab) => <button key={tab} className="min-h-11 shrink-0 snap-start rounded-full border border-white/10 px-4 text-sm font-semibold text-slate-100" type="button">{tab}</button>)}</div>;
}
