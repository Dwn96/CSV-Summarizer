import Transaction from './interfaces/Transaction';
import FileIO from './io/FileIO';
import DataProcess from './dataprocessor/DataProcess';

const tx:Transaction<string>[] = [];
const fileIO = new FileIO(tx);
const dataprocess = new DataProcess(fileIO);

dataprocess.computeDataSummary().then((map) => {
  dataprocess.convertMapToStringsAndWriteToCSV(map);
});
