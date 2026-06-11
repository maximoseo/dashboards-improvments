export function Drawer({ children }: { children: React.ReactNode }) {
  return <aside className="fixed inset-x-0 bottom-0 z-40 max-h-[85dvh] rounded-t-3xl border border-white/10 bg-panel p-4 shadow-glow md:inset-y-4 md:left-auto md:right-4 md:w-96 md:rounded-3xl">{children}</aside>;
}
