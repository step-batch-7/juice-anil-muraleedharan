const chai = require('chai');
const assert = chai.assert;
const saveFunctions = require('../src/save');

let { save, saveMessageFormatter, combineDataToSave } = saveFunctions;

describe('combineDataToSave', function() {
  it('should return an array by inserting current transation details', function() {
    assert.deepStrictEqual(
      combineDataToSave(
        [
          {
            '--empId': '1111',
            '--beverage': 'orange',
            '--qty': '1',
            '--date': '2019-11-23T04:35:27.776Z'
          }
        ],
        {
          '--empId': '1111',
          '--beverage': 'orange',
          '--qty': '1',
          '--date': '2019-11-23T04:35:27.776Z'
        }
      ),
      [
        {
          '--empId': '1111',
          '--beverage': 'orange',
          '--qty': '1',
          '--date': '2019-11-23T04:35:27.776Z'
        },
        {
          '--empId': '1111',
          '--beverage': 'orange',
          '--qty': '1',
          '--date': '2019-11-23T04:35:27.776Z'
        }
      ]
    );
  });
});

describe('saveMessageFormatter', function() {
  it('should return an message by combining text and current transaction details', function() {
    assert.strictEqual(
      saveMessageFormatter({
        '--empId': '1211',
        '--beverage': 'orange',
        '--qty': 2,
        '--date': '2019-11-26T03:12:47.472Z'
      }),
      'Transaction Recorded:\nEmployee ID,Beverage,Quantity,Date\n1211,orange,2,2019-11-26T03:12:47.472Z'
    );
  });
});

describe('save', function() {
  const readFunc = function(path) {
    return '[]';
  };
  let date = new Date();

  const writeFunc = function(path) {};

  it('should return the transaction details', function() {
    assert.deepStrictEqual(
      save(
        {
          cmndLineOptions: {
            '--empId': '1211',
            '--beverage': 'orange',
            '--qty': 2
          },
          date: date
        },
        'path',
        { readFunc: readFunc, writeFunc: writeFunc }
      ),
      {
        '--beverage': 'orange',
        '--date': date.toJSON(),
        '--empId': '1211',
        '--qty': 2
      }
    );
  });
});
