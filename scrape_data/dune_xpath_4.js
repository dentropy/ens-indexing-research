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
  await page.goto('http://127.0.0.1:8000/DuneDotEth.html', { waitUntil: 'networkidle2' });


  // const captcha = await readLine();
  // console.log(captcha)
  
  await delay(4000);

  const data = await page.evaluate(
    () => Array.from(
      document.querySelectorAll('table[class="table_table__fuS_N"] > tbody > tr'),
      row => Array.from(row.querySelectorAll('th, td'), cell => cell.innerText)
    )
  );
  fs.writeFileSync('mahFile.json', JSON.stringify(data));
  console.log("data")
  console.log(data)

  const elements = await page.$x("//div[@class='visual_wrap__BRTHj visual_table__RATKE']")
  await elements[0].click() 

  const data2 = await page.evaluate(
    () => Array.from(
      document.querySelectorAll('table[class="table_table__fuS_N"] > tbody > tr'),
      row => Array.from(row.querySelectorAll('th, td'), cell => cell.innerText)
    )
  );
  fs.writeFileSync('mahFile2.json', JSON.stringify(data2));
  console.log("data2")
  console.log(data2)


  


  await browser.close();
})();