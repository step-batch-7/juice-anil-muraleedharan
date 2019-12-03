const chai = require('chai');
const assert = chai.assert;
const processInput = require('../src/processInput');
const savefunc = require('../src/save');

let { save } = savefunc;
let {
  getObjectFromArray,
  getNumeric,
  operationAndDetailSeperator,
  getSlicedInput,
  getConvertedInput,
  processInputs
} = processInput;

describe('getObjectFromArray', function() {
  it('it should return an object by taking alternative elements as keys and value', function() {
    assert.deepStrictEqual(getObjectFromArray(['a', 'A', 'b', 'B', 'c', 'C']), {
      a: 'A',
      b: 'B',
      c: 'C'
    });
  });
  it('it should return an empty object if the given array is empty', function() {
    assert.deepStrictEqual(getObjectFromArray([]), {});
  });
});

describe('getNumeric', function() {
  it('should return the numeric value of the given string', function() {
    assert.strictEqual(getNumeric('1111'), 1111);
  });
});

describe('operationAndDetailSeperator', function() {
  it('should return an array which contains operation followed by a list of transaction details', function() {
    assert.deepStrictEqual(
      operationAndDetailSeperator([
        'node',
        'filename',
        '--save',
        '--empId',
        '1111',
        'beverage',
        'orange',
        'qty ',
        '1'
      ]),
      ['--save', ['--empId', '1111', 'beverage', 'orange', 'qty ', '1']]
    );
  });
});

describe('getSlicedInput', function() {
  it('should return an array by cutting out the first to elements', function() {
    assert.deepStrictEqual(
      getSlicedInput(
        [
          'node',
          'filename',
          '--save',
          '--empId',
          '1111',
          'beverage',
          'orange',
          'qty',
          '2'
        ],
        2
      ),
      ['--save', '--empId', '1111', 'beverage', 'orange', 'qty', '2']
    );
  });
});

describe('getConvertedInput', function() {
  it('should return an array by converting the operation to corresponding func references and qty to numeric', function() {
    date = new Date();
    assert.deepStrictEqual(
      getConvertedInput(
        ['--save', '--empId', '1111', '--beverage', 'orange', '--qty', '2'],
      ),
      [
        save,
        {
          '--empId': '1111',
          '--beverage': 'orange',
          '--qty': '2',
        }
      ]
    );
  });
});

describe('processInputs', function() {
  const readFunc = function(path) {
    return '[]';
  };

  const writeFunc = function(path) {};

  it('should return valid expected message if validity flag is true', function() {
    let date = new Date();
    let path = 'path';
    let expected =
      'Transaction Recorded:\nEmployee ID,Beverage,Quantity,Date\n1234,orange,1,' +
      date.toJSON();
    assert.strictEqual(
      processInputs(
        ['--save', '--empId', '1234', '--beverage', 'orange', '--qty', '1'],
        {
          date: date,
          databasePath: path,
          validityFlag: true,
          readFile: readFunc,
          writeFile: writeFunc
        }
      ),
      expected
    );
  });

  it('should return error message if the validitly flag is false', function() {
    assert.strictEqual(
      processInputs(['--query', '--empId', '1234'], false),
      'please enter valid inputs'
    );
  });
});
