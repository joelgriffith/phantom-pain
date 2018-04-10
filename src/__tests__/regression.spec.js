const puppeteer = require('puppeteer');
const URL = 'http://localhost:3000';
const { toMatchImageSnapshot } = require('jest-image-snapshot');

expect.extend({ toMatchImageSnapshot });

describe('visual regressions', () => {
    it('should not have them!', async() => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(URL);

        const screenshot = await page.screenshot();

        expect(screenshot).toMatchImageSnapshot();
    });
});