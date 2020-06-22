
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');

const chromeVer = process.env.CHROMEDRIVER_VERSION;

async function getTextFromElements(elements) {
    return Promise.all(elements.map(async (element) => {
        const elementText = await element.getText();
        return elementText;
    }));
}

export async function getPaydates() {
    chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());

    var chromeCapabilities = webdriver.Capabilities.chrome();
    var chromeOptions = {
        'args': ['--start-maximized', '--headless', '--lang=es', `user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${chromeVer} Safari/537.36"`]
    };

    chromeCapabilities.set('goog:chromeOptions', chromeOptions);

    var driver = new webdriver.Builder()
    .withCapabilities(chromeCapabilities)
    .build();
    await driver.get('https://www.nasdaq.com/market-activity/dividends');
    const allData = [];
    try {
        await driver.wait(webdriver.until.elementLocated(webdriver.By.className('evidon-banner-declinebutton')), 15000, 'waiting for cookie accept button');
        await driver.findElement(webdriver.By.className('evidon-banner-declinebutton')).click();
    }
    catch (e) {
        console.log(`No cookie warning located: ${e}`);
    }
    try {
        await driver.findElement(webdriver.By.css('th.market-calendar-table__columnheader:nth-child(4) > button:nth-child(1) > span:nth-child(1)')).click();
        const tickers = await driver.findElements(webdriver.By.css('[data-column="symbol"]'));
        const exdiv = await driver.findElements(webdriver.By.css('[data-column="dividend_Ex_Date"]'));
        const paydates = await driver.findElements(webdriver.By.css('[data-column="payment_Date"]'));
        const tickerArray = await getTextFromElements(tickers);
        const exdivArray = await getTextFromElements(exdiv);
        const paydatesArray = await getTextFromElements(paydates);

        // push everything into an array of objects representing the data for a single ticker
        // start at 1 to skip the headers
        for(let i = 1; i < tickerArray.length; i++) {
            allData.push({ ticker: tickerArray[i], exdiv: exdivArray[i], paydate: paydatesArray[i] });
            console.log(JSON.stringify(allData[i-1]));
        }
    }
    catch (e) {
        console.log(`encountered error: ${e}`);
    }
    await driver.quit();
    return allData;
}