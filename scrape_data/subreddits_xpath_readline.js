const puppeteer = require('puppeteer');
const readline = require('readline');

async function readLine() {

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    return new Promise(resolve => {

        rl.question('Enter captcha: ', (answer) => {
          rl.close();
          resolve(answer)
        });
    })
}

(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768});
    await page.goto('https://old.reddit.com', { waitUntil: 'networkidle2' });

    const captcha = await readLine();
    console.log(captcha)


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