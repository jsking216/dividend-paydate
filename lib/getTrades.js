const axios = require("axios");
const cheerio = require("cheerio");

export async function getTickerStatistics (ticker) {
  //  fetch stats from finviz
  let fetchedPage;
  try {
    fetchedPage = await axios.get(tickerFinvizUrl);
  } catch (err) {
    console.error(err);
    return { failed: true };
  }
  const tickerFinvizUrl = `https://finviz.com/quote.ashx?t=${ticker}`;
  

  // parse relevant stats
  const $ = cheerio.load(fetchedPage.data);

  const toFilter = [
    'Market Cap',
    'Dividend',
    'Dividend %',
    'Avg Volume'];
  const indeces = [];
  
  const headerCells = $('td.snapshot-td2-cp').filter(function (i, el) {
    const shouldKeep = toFilter.indexOf($(el).text().trim()) >= 0;
    if(shouldKeep) {
      indeces.push(i);
    }
    return shouldKeep;
  });

  let tickerStats = {};
  headerCells.each(function (i, el) {
    tickerStats[$(el).text()] =  $($('td.snapshot-td2').get(indeces[i])).text();
  });
  return tickerStats;
}

export async function getAllTickerStats(paydateData) {
  const tickerStats = [];
  console.log(paydateData);
  for(const instance of paydateData) {
    const currentStats = await getTickerStatistics(instance);
    await new Promise(r => setTimeout(r, 5000));
    if (currentStats.failed !== true) {
      tickerStats.push(currentStats);
    }
  }
  console.log(JSON.stringify(tickerStats));
}

function getNextTradeFromTickerData(tickerData)
{
  
}