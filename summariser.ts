import fs from 'fs';
import csv from 'csv-parser'
import Transaction from './src/interfaces/Transaction';
import UniqueOccurence from './src/interfaces/UniqueOccurence';

const data:Transaction[] = []
fs.createReadStream('input.csv')
    .pipe(csv(['lender','receiver','amount']))
    .on('data', (res) => {
        data.push(res)
    })
    .on('end', () => {  
        console.log(data);
        
        addToHashmap(data)  
    })


const addToHashmap = (transactions:Transaction[]) => {
    const map = new Map<string,UniqueOccurence>()
    for(const transaction of transactions){
        const uniqueConcat = transaction.lender+transaction.receiver
        const amount = formatAmount(transaction.amount)
        if(!map.has(uniqueConcat)){
            
            map.set(uniqueConcat,new UniqueOccurence(amount,0))
        }
        else {
        map.set(uniqueConcat,new UniqueOccurence(map.get(uniqueConcat)!.amount + amount,map.get(uniqueConcat)!.count + 1))
        }
    }
    console.log(map);

}

const formatAmount = (numberStr:string):number => {
    const number = parseFloat(numberStr)
    return Math.round(number * 100) / 100
}