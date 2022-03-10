import FileReadError from '../errors/FileReadError';
import InvalidDataEncounteredError from '../errors/InvalidDataEncounteredError';
import FileIO from '../io/FileIO';

class DataProcess {
  constructor(
        private fileIO:FileIO,
  ) {}

  static formatAmount(numberStr:string):number {
    const number = parseFloat(numberStr);
    const formatted = +number.toFixed(2);
    if (Number.isNaN(formatted)) {
      throw new InvalidDataEncounteredError(`Encountered invalid data while perfoming summary.
         Value ${numberStr} could not be correctly processed`);
    }
    return formatted;
  }

  async computeDataSummary(path:string) {
    try {
      const transactions = await this.fileIO.pipeCSVIntoArray(path);
      const map = new Map<string, number>();
      transactions.map((transaction, index) => {
        const uniqueConcat = DataProcess
          .concatLenderReceiver(transaction.lender, transaction.receiver, index);
        const { amount } = transaction;
        if (!map.has(uniqueConcat)) {
          map.set(uniqueConcat, DataProcess.formatAmount(amount));
        } else {
          map.set(uniqueConcat, map.get(uniqueConcat)! + DataProcess.formatAmount(amount));
        }
      });
      return map;
    } catch (error) {
      if (error instanceof InvalidDataEncounteredError) {
        console.log('\x1b[36m%s\x1b[0m','Something went wrong while computing the data summary:', (error as Error).message);
      }
      if (error instanceof FileReadError) {
        console.log('Something went wrong while reading the input csv:', (error as Error).message);
      }
    }
  }

  async convertMapToStringsAndWriteToCSV(map:Map<string, number>):Promise<void> {
    const rows:string[] = [];
    map.forEach((v, k) => {
      const row = k.split('-').join(',').concat(`,${v.toFixed(2)}`);
      rows.push(row);
    });
    await this.fileIO.writeProcessedDataToCSV(rows.sort());
  }

  static concatLenderReceiver(lender:string, receiver:string, index?:number):string {
    if (!lender || !receiver) {
      throw new InvalidDataEncounteredError(`Encountered invalid data while perfoming a concatenation.
      Data could not be correctly processed due to an unmatched lender/receipient combination at row ${index! + 1}`);
    }
    return `${lender}-${receiver}`;
  }
}

export default DataProcess;
