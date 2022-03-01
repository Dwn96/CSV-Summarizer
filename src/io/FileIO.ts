/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
import fs from 'fs';
import csv from 'csv-parser';
import Transaction from '../interfaces/Transaction';
import FileReadError from '../errors/FileReadError';
import FileWriteError from '../errors/FileWriteError';

class FileIO {
  async pipeCSVIntoArray(path:string):Promise<Transaction<string>[]> {
    const data:Transaction<string>[] = [];
    return new Promise((resolve, reject) => {
      fs.createReadStream(path)
        .pipe(csv(['lender', 'receiver', 'amount']))
        .on('error', (error) => {
          console.log(error);
          reject(error);
          throw new FileReadError((error as Error).message);
        })
        .on('data', (res) => {
          data.push(res);
          
        })
        .on('end', () => resolve(data));
    });
  }

  async writeProcessedDataToCSV(rows:string[]) {
    fs.writeFile('output.csv', rows.join('\r\n'), (error) => {
      if (error) {
        throw new FileWriteError((error as Error).message);
      }
      console.log('All done. Here`s your summarised data:', rows);
      console.log('Your data has also been written to: `./output.csv`');
    });
  }
}

export default FileIO;
