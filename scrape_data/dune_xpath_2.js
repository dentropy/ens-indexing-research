//div[@class='visual_wrap__BRTHj visual_table__RATKE']

const puppeteer = require('puppeteer');
const readline = require('readline');

function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}

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
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768});
  await page.goto('https://dune.com/queries/7507/14878', { waitUntil: 'networkidle2' });


  // const captcha = await readLine();
  // console.log(captcha)
  await delay(10000);

    let root_div_class = "visual_wrap__BRTHj visual_table__RATKE"
    // const text = await page.evaluate(() => {
    //     // $x() is not a JS standard -
    //     // this is only sugar syntax in chrome devtools
    //     // use document.evaluate()
    //     const elements = document
    //         .getElementsByClassName(
    //             "subreddit hover may-blank"
    //         )
    //     const result = [];
    //     for (let i = 0; i < elements.length; i++) {
    //         result.push([
    //             elements[i].textContent,
    //             elements[i].href,
    //         ]);
    //         }
    //     return result
    // });
    // console.log(text);

    const elements = await page.$$("//div[@class='visual_wrap__BRTHj visual_table__RATKE']")
    for (let i = 0; i < elements.length; i++) {
      const tweet = await (await elements[i].getProperty('innerText')).jsonValue();
      console.log(tweet);
    }
    // console.log(elements)
    // console.log(Object.keys(elements))
    // console.log(elements[0])

    await browser.close();
})();