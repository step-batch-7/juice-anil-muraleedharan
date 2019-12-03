const chai = require('chai');
const assert = chai.assert;
const queryFunctions = require('../src/query');

let {
  query,
  queryMessageFormatter,
  getConcattedTransactionDatas,
  addQuantity,
  isMatch
} = queryFunctions;

describe('addQuantity', function() {
  it('should add current datas qty field with the previous value', function() {
    assert.strictEqual(
      addQuantity(5, {
        '--empId': '1234',
        '--qty': 2,
        '--beverage': 'apple',
        '--date': '2019-11-26T09:48:11.877Z'
      }),
      7
    );
  });
});

describe('isMatch', function() {
  it('should return true if the given empId and the empId field of the object matches', function() {
    assert.deepStrictEqual(
      isMatch(
        { '--empId': '1234' },
        {
          '--empId': '1234',
          '--beverage': 'orange',
          '--qty': 2,
          '--date': '2019-11-26T05:17:54.298Z'
        }
      ),
      true
    );
  });
  it('should return false if the given empId and the empId field of the object does not matches', function() {
    assert.deepStrictEqual(
      isMatch(
        { empId: '1111' },
        {
          '--empId': '1234',
          '--beverage': 'orange',
          '--qty': 2,
          '--date': '2019-11-26T05:17:54.298Z'
        }
      ),
      false
    );
  });
  it('should return true if the given beverage and the beverage field of the object matches', function() {
    assert.deepStrictEqual(
      isMatch(
        { '--beverage': 'orange' },
        {
          '--empId': '1234',
          '--beverage': 'orange',
          '--qty': 2,
          '--date': '2019-11-26T05:17:54.298Z'
        }
      ),
      true
    );
  });
  it('should return false if the given beverage and the beverage field of the object does not matches', function() {
    assert.deepStrictEqual(
      isMatch(
        { '--beverage': 'apple' },
        {
          '--empId': '1234',
          '--beverage': 'orange',
          '--qty': 2,
          '--date': '2019-11-26T05:17:54.298Z'
        }
      ),
      false
    );
  });
  it('should return true if the given date and the date field of the object matches', function() {
    assert.deepStrictEqual(
      isMatch(
        { '--date': '2019-11-26' },
        {
          '--empId': '1234',
          '--beverage': 'orange',
          '--qty': 2,
          '--date': '2019-11-26T05:17:54.298Z'
        }
      ),
      true
    );
  });
  it('should return false if the given date and the date field of the object does not matches', function() {
    assert.deepStrictEqual(
      isMatch(
        { '--date': '2019-11-27' },
        {
          '--empId': '1234',
          '--beverage': 'orange',
          '--qty': 2,
          '--date': '2019-11-26T05:17:54.298Z'
        }
      ),
      false
    );
  });
  it('should return true if all the given query combinations and the corresponding field of the object matches', function() {
    assert.deepStrictEqual(
      isMatch(
        { '--date': '2019-11-26', '--beverage': 'orange', '--empId': '1234' },
        {
          '--empId': '1234',
          '--beverage': 'orange',
          '--qty': 2,
          '--date': '2019-11-26T05:17:54.298Z'
        }
      ),
      true
    );
  });
  it('should return true if all the given query combinations and the corresponding field of the object does not matches', function() {
    assert.deepStrictEqual(
      isMatch(
        { '--date': '2019-11-27', '--beverage': 'orange', '--empId': '1234' },
        {
          '--empId': '1234',
          '--beverage': 'orange',
          '--qty': 2,
          '--date': '2019-11-26T05:17:54.298Z'
        }
      ),
      false
    );
  });
});

describe('getConcattedTransactions', function() {
  it('should return the current transaction details by concatting', function() {
    assert.strictEqual(
      getConcattedTransactionDatas({
        '--empId': '1234',
        '--beverage': 'orange',
        '--qty': 2,
        '--date': '2019-11-26T05:17:54.298Z'
      }),
      '1234,orange,2,2019-11-26T05:17:54.298Z'
    );
  });
});

describe('querryMessageFormatter', function() {
  it('should format the employee transaction to the required manner', function() {
    assert.strictEqual(
      queryMessageFormatter([
        {
          '--empId': '1234',
          '--beverage': 'orange',
          '--qty': 2,
          '--date': '2019-11-26T05:17:54.298Z'
        },
        {
          '--empId': '1234',
          '--beverage': 'orange',
          '--qty': 2,
          '--date': '2019-11-26T08:58:31.280Z'
        },
        {
          '--empId': '1234',
          '--beverage': 'orange',
          '--qty': 2,
          '--date': '2019-11-26T08:58:32.247Z'
        },
        {
          '--empId': '1234',
          '--beverage': 'orange',
          '--qty': 2,
          '--date': '2019-11-26T08:58:33.115Z'
        }
      ]),
      'Employee ID, Beverage, Quantity, Date\n1234,orange,2,2019-11-26T05:17:54.298Z\n1234,orange,2,2019-11-26T08:58:31.280Z\n1234,orange,2,2019-11-26T08:58:32.247Z\n1234,orange,2,2019-11-26T08:58:33.115Z\nTotal: 8 Juices'
    );
  });
  it('should format the employee transaction and add plural form of juice', function() {
    assert.strictEqual(
      queryMessageFormatter([
        {
          '--empId': '1234',
          '--beverage': 'orange',
          '--qty': 2,
          '--date': '2019-11-26T05:17:54.298Z'
        }
      ]),
      'Employee ID, Beverage, Quantity, Date\n1234,orange,2,2019-11-26T05:17:54.298Z\nTotal: 2 Juices'
    );
  });
  it('should format the employee transaction and add singular form of juice', function() {
    assert.strictEqual(
      queryMessageFormatter([
        {
          '--empId': '1234',
          '--beverage': 'orange',
          '--qty': 1,
          '--date': '2019-11-26T05:17:54.298Z'
        }
      ]),
      'Employee ID, Beverage, Quantity, Date\n1234,orange,1,2019-11-26T05:17:54.298Z\nTotal: 1 Juice'
    );
  });
});

describe('query', function() {
  const readFunc = function(path) {
    return '[{"--empId": "1211","--beverage": "orange","--qty": 2,"--date": "2019-11-26T03:12:47.472Z"}]';
  };

  it('should find all the transactions by the employee and return', function() {
    assert.deepStrictEqual(
      query({ '--empId': '1211' }, 'path', { readFunc: readFunc }),
      [
        {
          '--beverage': 'orange',
          '--date': '2019-11-26T03:12:47.472Z',
          '--empId': '1211',
          '--qty': 2
        }
      ]
    );
  });
});
