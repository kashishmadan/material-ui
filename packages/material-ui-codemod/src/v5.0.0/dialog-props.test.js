import path from 'path';
import { expect } from 'chai';
import jscodeshift from 'jscodeshift';
import transform from './dialog-props';
import readFile from '../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@material-ui/codemod', () => {
  describe('v5.0.0', () => {
    describe('dialog-props', () => {
      it('transforms props as needed', () => {
        const actual = transform(
          {
            source: read('./dialog-props.test/actual.js'),
            path: require.resolve('./dialog-props.test/actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./dialog-props.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          {
            source: read('./dialog-props.test/expected.js'),
            path: require.resolve('./dialog-props.test/expected.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./dialog-props.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
