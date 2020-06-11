import { getPaydates } from './getPaydates';
import { readFileSync, writeFileSync }  from 'fs';

const datafile = 'persistentPaydates.json';

function readPaydates() {
  const paydates = [];
  const existing = JSON.parse(readFileSync(datafile, 'utf8'));
  existing.map((elem) => {
    paydates.push(elem);
  });
  
  return paydates;
}

function writePaydates(paydates) {
  const asJson = JSON.stringify(paydates);
  writeFileSync(datafile, asJson, 'utf8');
}

async function processPaydates() {
  const allPaydates = readPaydates();
  const newPaydates = await getPaydates();

  // get rid of old ticker data
  const filteredPaydates = allPaydates.filter((elem) => {
    const shouldFilter = newPaydates.some((paydate) => {
      return paydate.ticker === elem.ticker;
    });
    console.log(`should filter ${elem.ticker}: ${shouldFilter}`);
    return !shouldFilter;
  });

  filteredPaydates.push(...newPaydates);

  console.log(`Writing ${filteredPaydates.length} paydate records to file`);
  writePaydates(filteredPaydates);
}

processPaydates();