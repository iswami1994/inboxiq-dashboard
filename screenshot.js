const { chromium } = require('playwright');

async function takeScreenshots() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    colorScheme: 'light'
  });
  const page = await context.newPage();

  const pages = [
    { path: '/', name: '01-executive-summary' },
    { path: '/analytics', name: '02-analytics' },
    { path: '/operations', name: '03-operations' },
    { path: '/pipeline', name: '04-pipeline' },
  ];

  for (const p of pages) {
    console.log(`Capturing ${p.name}...`);
    await page.goto(`http://localhost:3002${p.path}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000); // Wait for charts to render
    await page.screenshot({
      path: `screenshots/${p.name}.png`,
      fullPage: true
    });
    console.log(`Saved ${p.name}.png`);
  }

  await browser.close();
  console.log('All screenshots captured!');
}

takeScreenshots().catch(console.error);
