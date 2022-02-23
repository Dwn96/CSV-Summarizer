import fs from 'fs';
import csv from 'csv-parser';
import Transaction from './src/interfaces/Transaction';

const data:Transaction<string>[] = [];

const formatAmount = (numberStr:string):number => {
  const number = parseFloat(numberStr);
  const formatted = +number.toFixed(2);
  return formatted;
};

const concatLenderReceiver = (lender:string, receiver:string):string => `${lender}-${receiver}`;

const addToHashmap = (transactions:Transaction<string>[]) => {
  const map = new Map<string, number>();
  transactions.map((transaction) => {
    const uniqueConcat = concatLenderReceiver(transaction.lender, transaction.receiver);
    const { amount } = transaction;
    if (!map.has(uniqueConcat)) {
      map.set(uniqueConcat, formatAmount(amount));
    } else {
      map.set(uniqueConcat, map.get(uniqueConcat)! + formatAmount(amount));
    }
  });
  return map;
};

const convertMapToCSVRows = (map:Map<string, number>):string[] => {
  const rows:string[] = [];
  map.forEach((v, k) => {
    const row = k.split('-').join(',').concat(`,${v.toFixed(2)}`);
    rows.push(row);
  });
  return rows;
};

const writeOutputToFile = (rows:string[]) => {
  fs.writeFile('output.csv', rows.join('\r\n'), () => { });
};

fs.createReadStream('input.csv')
  .pipe(csv(['lender', 'receiver', 'amount']))
  .on('error', (error) => {
    console.log('Something went wrong reading/processing the input file', error.message);
  })
  .on('data', (res) => {
    data.push(res);
  })
  .on('end', () => {
    const map = addToHashmap(data);
    const rows = convertMapToCSVRows(map);
    writeOutputToFile(rows)
    console.log('All done. Ouput can be found inside output.csv');
  });
