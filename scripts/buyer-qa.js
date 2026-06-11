const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const base = process.env.QA_BASE_URL || 'https://dashaudit.onrender.com';
const out = path.resolve('qa-output');
fs.mkdirSync(path.join(out, 'screenshots'), { recursive: true });

const pages = [
  { name: 'landing', url: '/' },
  { name: 'dashboards', url: '/dashboards' },
  { name: 'wizard', url: '/dashboards/new' },
  { name: 'report', url: '/dashboards/demo/scans/demo' },
];
const viewports = [
  { name: 'mobile360', width: 360, height: 780 },
  { name: 'iphone390', width: 390, height: 844 },
  { name: 'desktop1440', width: 1440, height: 900 },
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const issues = [];
  for (const vp of viewports) {
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: 1 });
    const page = await context.newPage();
    const consoleEvents = [];
    const failedRequests = [];
    page.on('console', msg => {
      if (['error', 'warning'].includes(msg.type())) consoleEvents.push(`${msg.type()}: ${msg.text()}`);
    });
    page.on('requestfailed', req => failedRequests.push(`${req.method()} ${req.url()} ${req.failure()?.errorText}`));
    for (const p of pages) {
      const url = base + p.url;
      const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
      if (!response || response.status() >= 400) issues.push(`${vp.name}/${p.name}: bad status ${response?.status()}`);
      const title = await page.title();
      if (!title || !title.includes('DashAudit')) issues.push(`${vp.name}/${p.name}: missing DashAudit title`);
      const h1Count = await page.locator('h1').count();
      if (h1Count < 1) issues.push(`${vp.name}/${p.name}: missing h1`);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
      if (overflow) issues.push(`${vp.name}/${p.name}: horizontal overflow ${await page.evaluate(() => document.documentElement.scrollWidth)} > ${vp.width}`);
      const tinyInputs = await page.evaluate(() => [...document.querySelectorAll('input, textarea, select')].filter(el => parseFloat(getComputedStyle(el).fontSize) < 16).length);
      if (tinyInputs) issues.push(`${vp.name}/${p.name}: ${tinyInputs} inputs below 16px`);
      const smallButtons = await page.evaluate(() => [...document.querySelectorAll('button, a[href]')].filter(el => {
        const r = el.getBoundingClientRect();
        const text = (el.textContent || '').trim();
        return text && r.width > 0 && r.height > 0 && (r.height < 44 || r.width < 44);
      }).map(el => `${el.tagName}:${(el.textContent||'').trim().slice(0,40)}`));
      if (smallButtons.length) issues.push(`${vp.name}/${p.name}: small targets ${smallButtons.slice(0,5).join('; ')}`);
      await page.screenshot({ path: path.join(out, 'screenshots', `${vp.name}-${p.name}.png`), fullPage: true });
    }
    await page.goto(base + '/dashboards/new', { waitUntil: 'networkidle' });
    await page.getByLabel('Dashboard name').fill('QA Buyer Dashboard');
    await page.getByLabel('Dashboard URL').fill('https://example.com/admin');
    await page.getByLabel('Login URL').fill('https://example.com/login');
    await page.getByLabel('Success selector').fill('[data-testid="dashboard"]');
    await page.getByRole('button', { name: /Save encrypted dashboard/i }).click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(out, 'screenshots', `${vp.name}-wizard-filled.png`), fullPage: true });
    if (consoleEvents.length) issues.push(`${vp.name}: console ${consoleEvents.join(' | ')}`);
    if (failedRequests.length) issues.push(`${vp.name}: failed requests ${failedRequests.join(' | ')}`);
    await context.close();
  }
  await browser.close();
  const report = ['# DashAudit buyer QA', '', `Base: ${base}`, '', '## Issues', ...(issues.length ? issues.map(i => `- ${i}`) : ['- None found by automated buyer QA']), ''].join('\n');
  fs.writeFileSync(path.join(out, 'report.md'), report);
  console.log(report);
  if (issues.length) process.exit(1);
})();
