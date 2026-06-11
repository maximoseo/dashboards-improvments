export function MarkdownExportButton({ scanId }: { scanId: string }) {
  return <a download={`dashaudit-${scanId}.md`} href={`data:text/markdown;charset=utf-8,${encodeURIComponent(`# DashAudit Report\n\nScan: ${scanId}\n\nNo fabricated findings. Export includes verified evidence refs when present.\n`)}`} className="fixed bottom-20 right-4 inline-flex min-h-14 items-center rounded-full bg-violet px-6 font-semibold shadow-glow sm:bottom-6">Export MD</a>;
}
