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
    const {amount} = transaction
    if (!map.has(uniqueConcat)) {
      map.set(uniqueConcat, formatAmount(amount));
    } else {
      map.set(uniqueConcat, map.get(uniqueConcat)! + formatAmount(amount));
    }
  });
  return map;
};

const convertMapToJSONObject = (map:Map<string, number>):Transaction[] => {
  const transactions:Transaction[] = [];
  map.forEach((v, k) => {
    const key = k.split('-');
    const transaction:Transaction = {
      lender: key[0],
      receiver: key[1],
      amount: v.toString(),
    };
    transactions.push(transaction);
  });
  console.log(transactions);
  return transactions;
};

fs.createReadStream('input.csv')
  .pipe(csv(['lender', 'receiver', 'amount']))
  .on('data', (res) => {
    data.push(res);
  })
  .on('end', () => {
    console.log(data);

    const map = addToHashmap(data);
    console.log(convertMapToJSONObject(map));
    
  });


