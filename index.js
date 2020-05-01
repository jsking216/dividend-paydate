
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');

chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());

async function getPaydates() {
    var driver = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .build();
    await driver.get('https://www.nasdaq.com/market-activity/dividends');
    await driver.wait(webdriver.until.elementLocated(webdriver.By.className('evidon-banner-declinebutton')), 10000, 'waiting for cookie accept button');
    await driver.findElement(webdriver.By.className('evidon-banner-declinebutton')).click();
    await driver.findElement(webdriver.By.css('th.market-calendar-table__columnheader:nth-child(4) > button:nth-child(1) > span:nth-child(1)')).click();
    const tickers = await driver.findElements(webdriver.By.css('[data-column="symbol"]'));
    const exdiv = await driver.findElements(webdriver.By.css('[data-column="dividend_Ex_Date"]'));
    const paydates = await driver.findElements(webdriver.By.css('[data-column="payment_Date"]'));
    const tickerArray = await getTextFromElements(tickers);
    const exdivArray = await getTextFromElements(exdiv);
    const paydatesArray = await getTextFromElements(paydates);

    // push everything into an array of objects representing the data for a single ticker
    const allData = [];
    for(let i = 0; i < tickerArray.length; i++) {
        allData.push({ ticker: tickerArray[i], exdiv: exdivArray[i], paydate: paydatesArray[i] });
        console.log(JSON.stringify(allData[i]));
    }

    await driver.quit();
}

async function getTextFromElements(elements) {
    return Promise.all(elements.map(async (element) => {
        const elementText = await element.getText();
        return elementText;
    }));
}

getPaydates();