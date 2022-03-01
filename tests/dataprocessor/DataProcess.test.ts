import assert from 'assert';
import { describe, it } from 'mocha';
import Sinon from 'sinon';
import { anything, verify } from 'ts-mockito';
import DataProcess from '../../src/dataprocessor/DataProcess';
import InvalidDataEncounteredError from '../../src/errors/InvalidDataEncounteredError';
import FileIO from '../../src/io/FileIO';
import FileReadError from '../../src/errors/FileReadError';

describe('DataProcess', () => {
  describe('formatAmount', () => {
    it('Should return convert a stringified number to a float with 2 dp', () => {
      const expected = 1.23;
      const actual = DataProcess.formatAmount('1.2345');
      assert.equal(actual, expected);
    });

    it('Should throw an error of type InvalidDataEncounteredError if invalid data is passed in', () => {
      assert.throws(() => { DataProcess.formatAmount('abc'); }, InvalidDataEncounteredError);
    });
  });

  describe('computeDataSummary', () => {
    const fakeFileIO = Sinon.createStubInstance(FileIO);
    const sut = new DataProcess(fakeFileIO);

    it('Should read csv file contents into array', () => {
      sut.computeDataSummary(anything());
      verify(fakeFileIO.pipeCSVIntoArray.calledOnce);
    });
    it('Should return a FileReadError if pipeCSVIntoArray fails', () => {
      fakeFileIO.pipeCSVIntoArray.throws(InvalidDataEncounteredError);
      sut.computeDataSummary(anything());
      assert.throws(() => { sut.computeDataSummary(anything()); }, Error);
    });
  });

  describe('concatLenderReceiver', () => {
    it('should form a hyphen separated concatenation of a passed arguments', () => {
      const expected = 'Carl-Alex'
      const actual = DataProcess.concatLenderReceiver('Carl', 'Alex');
      assert.equal(actual, expected);
    })

    it('should throw an InvalidDataEncounteredError error when invalid / missing data is passed in', () => {
      assert.throws(() => { DataProcess.concatLenderReceiver('abc', ''); }, InvalidDataEncounteredError);
    });

  });

  describe('convertMapToStringsAndWriteToCSV', () => {
    const fakeFileIO = Sinon.createStubInstance(FileIO);
    const sut = new DataProcess(fakeFileIO);
    it('should always be called on array parameters ',() => {
      sut.convertMapToStringsAndWriteToCSV(anything())
      verify(fakeFileIO.writeProcessedDataToCSV.calledOnceWith([]))
    })

    it('should write output to a csv', () => {
      sut.convertMapToStringsAndWriteToCSV(anything())
      verify(fakeFileIO.writeProcessedDataToCSV.called)
    })

  })
});
