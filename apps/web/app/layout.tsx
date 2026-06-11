import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = { title: 'DashAudit', description: 'Evidence-backed dashboard audits.' };
export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: '#08070d' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className="dark"><body>{children}</body></html>;
}
