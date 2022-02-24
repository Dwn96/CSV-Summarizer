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
  return rows.sort();
};

const writeOutputToFile = async (rows:string[]) => {
  fs.writeFile('output.csv', rows.join('\r\n'), (err) => {
    if (err) {
      throw err;
    }
    console.log('All done. Here`s your summarised data:', rows);
    console.log('Your data has also been written to: `./output.csv`');
  });
};

const logMetrics = (startTime:number, endTime:number, rows:number) => {
  const msDifference = endTime - startTime;
  console.log(`Processed ${rows} rows in ${msDifference} ms`);
};

const 
fs.createReadStream('input.csv')
  .pipe(csv(['lender', 'receiver', 'amount']))
  .on('error', (error) => {
    console.log('Something went wrong reading/processing the input file', error.message);
  })
  .on('data', (res) => {
    console.log('Reading data...');
    data.push(res);
  })
  .on('end', async () => {
    const startTime = performance.now()
    const map = addToHashmap(data);
    const rows = convertMapToCSVRows(map);
    await writeOutputToFile(rows).then(() => {
      const endTime = performance.now();
      logMetrics(startTime, endTime, rows.length);
    });
  });
