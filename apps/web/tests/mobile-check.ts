import { readFileSync } from 'node:fs';
const css = readFileSync(new URL('../app/globals.css', import.meta.url), 'utf8');
const page = readFileSync(new URL('../app/page.tsx', import.meta.url), 'utf8');
const checks: [string, boolean][] = [
  ['uses 100dvh/min-h-dvh', css.includes('100dvh') || page.includes('min-h-dvh')],
  ['body font is at least 16px', css.includes('font-size: 16px')],
  ['horizontal overflow disabled', css.includes('overflow-x: hidden')],
  ['touch targets use min-h-14 and min-h-11', page.includes('min-h-14') && page.includes('min-h-11')],
  ['safe-area bottom support', css.includes('env(safe-area-inset-bottom)')],
];
for (const [name, ok] of checks) console.log(`${ok ? 'PASS' : 'FAIL'} ${name}`);
if (checks.some(([, ok]) => !ok)) process.exit(1);
