import fs from 'fs';
import csv from 'csv-parser';
import Transaction from './src/interfaces/Transaction';

const data:Transaction[] = [];

const formatAmount = (numberStr:string):number => {
  const number = parseFloat(numberStr);
  const formatted = +number.toFixed(2);
  return formatted;
};

const concatLenderReceiver = (lender:string, receiver:string):string => `${lender}-${receiver}`;

const addToHashmap = (transactions:Transaction[]) => {
  const map = new Map<string, number>();
  transactions.map((transaction) => {
    const uniqueConcat = concatLenderReceiver(transaction.lender, transaction.receiver);
    const amount = formatAmount(transaction.amount);
    if (!map.has(uniqueConcat)) {
      map.set(uniqueConcat, amount);
    } else {
      map.set(uniqueConcat, map.get(uniqueConcat)! + amount);
    }
  });
  console.log(map);
};

fs.createReadStream('input.csv')
  .pipe(csv(['lender', 'receiver', 'amount']))
  .on('data', (res) => {
    data.push(res);
  })
  .on('end', () => {
    console.log(data);

    addToHashmap(data);
  });
