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

    it('Should read csv file contents into array before processing is started', () => {
      sut.computeDataSummary();
      verify(fakeFileIO.pipeCSVIntoArray.calledOnce);
    });
    it('Should return a FileReadError if pipeCSVIntoArray fails', () => {
      fakeFileIO.pipeCSVIntoArray.rejects();
      sut.computeDataSummary();
      assert.throws(() => { sut.computeDataSummary(); }, Error);
    });
  });
});
