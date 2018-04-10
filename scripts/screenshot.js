const puppeteer = require('puppeteer');

(async() => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('http://localhost:3000/#/1');
    await page.screenshot({ path: '../no-git/screenshot.png' });

    browser.close();
})();
