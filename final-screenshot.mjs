import { chromium } from '@playwright/test';

const browser = await chromium.launch({ headless: false });
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto('http://localhost:3002/products');
await page.waitForTimeout(3000);

// Take screenshot
await page.screenshot({ path: 'final-ui.png', fullPage: true });

// Keep browser open for 10 seconds
await page.waitForTimeout(10000);
await browser.close();
