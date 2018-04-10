const puppeteer = require('puppeteer');
const URL = 'http://localhost:3000';

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