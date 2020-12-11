const puppeteer = require('puppeteer');
(async () => {
    require('dotenv').config()
    const browser = await puppeteer.launch( {headless: false });
    const page = await browser.newPage();
    await page.goto('https://borsdata.se/investeringsstrategi/magic-formula');
  //väntar chromefliken öppen
    await browser.waitForTarget(() => true)

    //Header Logga in
    await page.click('#LogInOpenButton')
    await page.waitFor(1000)


    // Skriv in username, password klicka på "Logga in-knapp"
    //value 1 = selector. value 2 = input
    console.log('Username is being put in')
    await page.type('#login_UserName', process.env.USERNAME)
    
    await page.type('#login_Password', process.env.PASSWORD)
    console.log('Username and Password is put in')
    

    await page.click('#submitLogin')
    console.log('You got signed in!')


    await page.waitFor(2000)
    const values = await page.evaluate(() => {
        let magicFormulaStocks = document.querySelectorAll('[data-instrumentid]');
        const individualStocks = [...magicFormulaStocks];
        return individualStocks.map(h => h.innerText.split('\t'));
    });

    console.log(values);
    companyArray = []
    values.forEach(element => {
        let companyName = element[1];
        companyArray.push(companyName);
        console.log(companyName)
    });
        console.log(companyArray)

       
    //STÄNGER DEVFÖNSTER
    // await browser.close();
})();