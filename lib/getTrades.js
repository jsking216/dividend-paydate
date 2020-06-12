const axios = require("axios");
const cheerio = require("cheerio");

async function getTickerStatistics (ticker) {
  //  fetch stats from finviz
  const tickerFinvizUrl = `https://finviz.com/quote.ashx?t=${ticker}`;
  const fetchedPage = await axios.get(tickerFinvizUrl);

  // parse relevant stats ()
  const $ = cheerio.load(fetchedPage);
  $('.snapshot-table2').each((ind, elem) => {
    console.log(elem);
  });
}

function getAllTickerStats(tickerData) {
  
}

function getNextTradeFromTickerData(tickerData)
{
  
}