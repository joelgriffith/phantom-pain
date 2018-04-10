const puppeteer = require('puppeteer');
const util = require('util');
const fs = require('fs');

const save = util.promisify(fs.writeFile);

(async() => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('http://localhost:8080/#/0');

    const html = await page.content();
    await save('./build/index.html', html);

    browser.close();
})();
