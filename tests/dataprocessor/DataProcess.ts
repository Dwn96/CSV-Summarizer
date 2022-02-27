import assert from 'assert';
import { describe, it } from 'mocha';
import DataProcess from '../../src/dataprocessor/DataProcess';
import InvalidDataEncounteredError from '../../src/errors/InvalidDataEncounteredError';

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
    
  })
});
