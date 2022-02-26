/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
import fs from 'fs';
import csv from 'csv-parser';
import Transaction from '../interfaces/Transaction';

class FileIO {
  constructor(
        public data:Transaction<string>[],
  ) {

  }

  pipeCSVIntoArray():Promise<Transaction<string>[]> {
    return new Promise((resolve, reject) => {
      fs.createReadStream('input.csv')
        .pipe(csv(['lender', 'receiver', 'amount']))
        .on('error', (error) => {
          console.log(error);
          reject(error);
        })
        .on('data', (res) => {
          this.data.push(res);
        })
        .on('end', () => resolve(this.data));
    });
  }

  async writeProcessedDataToCSV(rows:string[]) {
    fs.writeFile('output.csv', rows.join('\r\n'), (err) => {
      if (err) {
        throw err;
      }
      console.log('All done. Here`s your summarised data:', rows);
      console.log('Your data has also been written to: `./output.csv`');
    });
  }
}

export default FileIO;
