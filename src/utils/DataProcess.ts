import FileIO from '../io/FileIO';

class DataProcess {

  constructor(
        private fileIO:FileIO
  ) {}


  private static formatAmount(numberStr:string):number {
    const number = parseFloat(numberStr);
    const formatted = +number.toFixed(2);
    return formatted;
  }

  async computeDataSummary() {
    const transactions = await this.fileIO.pipeCSVIntoArray();
    const map = new Map<string, number>();
    transactions.map((transaction) => {
      const uniqueConcat = DataProcess
        .concatLenderReceiver(transaction.lender, transaction.receiver);
      const { amount } = transaction;
      if (!map.has(uniqueConcat)) {
        map.set(uniqueConcat, DataProcess.formatAmount(amount));
      } else {
        map.set(uniqueConcat, map.get(uniqueConcat)! + DataProcess.formatAmount(amount));
      }
    });
    return map;
  }

  async convertMapToStringsAndWriteToCSV(map:Map<string, number>):Promise<void> {
    const rows:string[] = [];
    map.forEach((v, k) => {
      const row = k.split('-').join(',').concat(`,${v.toFixed(2)}`);
      rows.push(row);
    });
    await this.fileIO.writeProcessedDataToCSV(rows.sort());
  }

  private static concatLenderReceiver(lender:string, receiver:string):string {
    return `${lender}-${receiver}`;
  }
}

export default DataProcess;
