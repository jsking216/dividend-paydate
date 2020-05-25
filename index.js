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

  newPaydates.map((elem) => {
    allPaydates.push(elem);
  });

  writePaydates(allPaydates);
}

processPaydates();