const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://en.wikipedia.org', { waitUntil: 'networkidle2' });

    const text = await page.evaluate(() => {
        // $x() is not a JS standard -
        // this is only sugar syntax in chrome devtools
        // use document.evaluate()
        const featureArticle = document
            .evaluate(
                '//*[@id="mp-tfa"]',
                document,
                null,
                XPathResult.FIRST_ORDERED_NODE_TYPE,
                null
            )
            .singleNodeValue;

        return featureArticle.textContent;
    });

    console.log(text);
    await browser.close();
})();