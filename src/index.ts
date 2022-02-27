import Transaction from './interfaces/Transaction';
import FileIO from './io/FileIO';
import DataProcess from './dataprocessor/DataProcess';

const fileIO = new FileIO();
const dataprocess = new DataProcess(fileIO);

dataprocess.computeDataSummary().then((map) => {
  dataprocess.convertMapToStringsAndWriteToCSV(map!);
});
