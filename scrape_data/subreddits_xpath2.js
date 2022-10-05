const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768});
    await page.goto('https://old.reddit.com', { waitUntil: 'networkidle2' });

    const text = await page.evaluate(() => {
        // $x() is not a JS standard -
        // this is only sugar syntax in chrome devtools
        // use document.evaluate()
        const elements = document
            .getElementsByClassName(
                "subreddit hover may-blank"
            )
        const result = [];
        for (let i = 0; i < elements.length; i++) {
            result.push([
                elements[i].textContent,
                elements[i].href,
            ]);
            }
        return result
    });

    console.log(text);
    await browser.close();
})();