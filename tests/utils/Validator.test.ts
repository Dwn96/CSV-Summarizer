import { assert } from 'chai';
import { describe, it } from 'mocha';
import Validity from '../../src/utils/types/Validity';
import InputValidator from '../../src/utils/Validator';

describe('InputValidator', () => {
  const validator = new InputValidator();
  describe('getFileExtension', () => {
    it('should return a file extension given a file name', () => {
      const expected = 'csv';
      const actual = validator.getFileExtension('input.csv');
      assert.equal(actual, expected);
    });

    it('should return a file extension given an absolute path ', () => {
      const expected = 'csv';
      const actual = validator.getFileExtension('./name/files/input.csv');
      assert.equal(actual, expected);
    });
  });
  describe('isValid', () => {
    it('Should return objects instances of Validy class', () => {
      const res = validator.isValidCSV([]);
      assert.isTrue(res instanceof Validity);
    });

    it('should return a false validity if input extension is not csv', () => {
      const res = validator.isValidCSV(['', '', 'input.exe']);
      assert.isFalse(res.isValid);
    });

    it('should return a false validity if input is missing', () => {
      const res = validator.isValidCSV(['', '']);
      assert.isFalse(res.isValid);
    });
    it('should return a true validity if data is of correct length and extension', () => {
      const res = validator.isValidCSV(['', '', 'test.csv']);
      assert.isTrue(res.isValid);
    });
  });
});
