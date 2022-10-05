//div[@class='visual_wrap__BRTHj visual_table__RATKE']

const puppeteer = require('puppeteer');
const readline = require('readline');
const fs = require('fs');

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

  const data = await page.evaluate(
    () => Array.from(
      document.querySelectorAll('table[class="table_table__fuS_N"] > tbody > tr'),
      row => Array.from(row.querySelectorAll('th, td'), cell => cell.innerText)
    )
  );
  fs.writeFileSync('data.json', JSON.stringify(data));
  console.log("data")
  console.log(data)

  console.log("NEXT")
  const elements = await page.$x("//li[6]//button[1]")
  await elements[0].click() 
  await delay(2000);

  console.log("NEXT")
  const elements2 = await page.$x("//li[6]//button[1]")
  await elements2[0].click() 
  await delay(2000);
  console.log("NEXT")

  const data2 = await page.evaluate(
    () => Array.from(
      document.querySelectorAll('table[class="table_table__fuS_N"] > tbody > tr'),
      row => Array.from(row.querySelectorAll('th, td'), cell => cell.innerText)
    )
  );
  fs.writeFileSync('data2.json', JSON.stringify(data2));
  console.log("data2")
  console.log(data2)


  


  await browser.close();
})();