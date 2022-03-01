import Transaction from './interfaces/Transaction';
import FileIO from './io/FileIO';
import DataProcess from './dataprocessor/DataProcess';
import InputValidator from './utils/Validator';

const fileIO = new FileIO();
const dataprocess = new DataProcess(fileIO);
const validator = new InputValidator();

// fileIO.pipeCSVIntoArray(process.argv[2])

function processData() {
  const stdInPath = process.argv;
  const validity = validator.isValidCSV(stdInPath);
  if (!validity.isValid) {
    console.log(`Your file could not be processed,${validity.reason}`);
    return
  }
  dataprocess.computeDataSummary(process.argv[2]).then((map) => {
    dataprocess.convertMapToStringsAndWriteToCSV(map!);
  });
}

processData();
