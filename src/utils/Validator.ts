import Validity from './types/Validity';

class InputValidator {
  isValidCSV(param:string[]):Validity {
    if (param.length < 3) {
      return new Validity(false, 'Input file is possibly missing');
    }

    const inputFile = param[2];
    const extension = this.getFileExtension(inputFile);

    if (extension !== 'csv') {
      return new Validity(false, 'Input file is possibly not a csv. Please check and try again');
    }

    return new Validity(true);
  }

  getFileExtension(fileName:string):string {
    console.log(fileName);

    const splitNameArray = fileName.split('.');
    const extension = splitNameArray[splitNameArray.length - 1];
    return extension;
  }
}

export default InputValidator;
