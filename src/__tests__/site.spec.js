const puppeteer = require('puppeteer');
const URL = 'http://localhost:3000';

describe('my cool presentation', () => {
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