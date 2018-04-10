const puppeteer = require('puppeteer');
const { toMatchImageSnapshot } = require('jest-image-snapshot');
const URL = 'http://localhost:3000';

expect.extend({ toMatchImageSnapshot });

describe('Functional Tests', () => {
    it('should have a cool title', async() => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(URL);

        const title = await page.evaluate(() => document.querySelector('h1').innerHTML);

        expect(title).toEqual('Phantom Pain');
    });

    it('should have, like, arrows for moving', async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(URL);

        const button = await page.evaluate(() => document.querySelector('button').innerHTML);

        expect(button).toMatchSnapshot();
    });

    it('should move to the next slide when clicked', async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(URL);

        const button = await page.click('button');
        const nextURL = await page.evaluate(() => window.location.href);

        expect(nextURL).toContain(URL);
    });
});

describe('Visual Regressions', () => {
    it('should not have them!', async() => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(URL);

        const screenshot = await page.screenshot();

        expect(screenshot).toMatchImageSnapshot();
    });
});

describe('Bundle usage', () => {
    it('should use at least 50% of the bundled resources', async() => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await Promise.all([
            page.coverage.startJSCoverage(),
            page.coverage.startCSSCoverage()
        ]);

        await page.goto(URL);

        const [jsCoverage, cssCoverage] = await Promise.all([
            page.coverage.stopJSCoverage(),
            page.coverage.stopCSSCoverage(),
        ]);

        let totalBytes = 0;
        let usedBytes = 0;

        const coverage = [...jsCoverage, ...cssCoverage];

        for (const entry of coverage) {
            totalBytes += entry.text.length;
            for (const range of entry.ranges)
                usedBytes += range.end - range.start - 1;
        }

        expect(usedBytes / totalBytes).toBeGreaterThan(0.5);
    });
});