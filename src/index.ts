import Transaction from './interfaces/Transaction';
import FileIO from './io/FileIO';
import DataProcess from './dataprocessor/DataProcess';

const fileIO = new FileIO();


fileIO.pipeCSVIntoArray(process.argv[2])


