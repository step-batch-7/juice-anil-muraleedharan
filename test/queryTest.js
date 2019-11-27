const queryFunctions = require("../src/query");
const chai = require("chai");
const assert = chai.assert;

let {
  query,
  queryMessageFormatter,
  getConcattedTransactionDatas,
  addQuantity,
  getEmployeeTransactions
} = queryFunctions;

describe("addQuantity", function() {
  it("should add current datas qty field with the previous value", function() {
    assert.strictEqual(
      addQuantity(5, {
        "--empId": "1234",
        "--qty": 2,
        "--beverage": "apple",
        "--date": "2019-11-26T09:48:11.877Z"
      }),
      7
    );
  });
});

describe("getEmployeeTransactions", function() {
  it("should return all the transactions done by that employee", function() {
    assert.deepStrictEqual(
      getEmployeeTransactions(
        {
          "1234": [
            {
              "--empId": "1234",
              "--beverage": "orange",
              "--qty": 2,
              "--date": "2019-11-26T05:17:54.298Z"
            },
            {
              "--empId": "1234",
              "--beverage": "apple",
              "--qty": 1,
              "--date": "2019-11-26T08:58:31.280Z"
            }
          ],
          "1111": [
            {
              "--empId": "1234",
              "--beverage": "orange",
              "--qty": 2,
              "--date": "2019-11-26T08:58:32.247Z"
            }
          ],
          "2222": [
            {
              "--empId": "1234",
              "--beverage": "orange",
              "--qty": 2,
              "--date": "2019-11-26T08:58:33.115Z"
            }
          ]
        },
        "1234"
      ),
      [
        {
          "--empId": "1234",
          "--beverage": "orange",
          "--qty": 2,
          "--date": "2019-11-26T05:17:54.298Z"
        },
        {
          "--empId": "1234",
          "--beverage": "apple",
          "--qty": 1,
          "--date": "2019-11-26T08:58:31.280Z"
        }
      ]
    );
  });
  it("should return all the transactions done by that employee", function() {
    assert.deepStrictEqual(
      getEmployeeTransactions(
        {
          "1234": [
            {
              "--empId": "1234",
              "--beverage": "orange",
              "--qty": 2,
              "--date": "2019-11-26T05:17:54.298Z"
            },
            {
              "--empId": "1234",
              "--beverage": "apple",
              "--qty": 1,
              "--date": "2019-11-26T08:58:31.280Z"
            }
          ],
          "1111": [
            {
              "--empId": "1234",
              "--beverage": "orange",
              "--qty": 2,
              "--date": "2019-11-26T08:58:32.247Z"
            }
          ],
          "2222": [
            {
              "--empId": "1234",
              "--beverage": "orange",
              "--qty": 2,
              "--date": "2019-11-26T08:58:33.115Z"
            }
          ]
        },
        "3333"
      ),
      []
    );
  });
});

describe("getConcattedTransactions", function() {
  it("should return the current transaction details by concatting", function() {
    assert.strictEqual(
      getConcattedTransactionDatas({
        "--empId": "1234",
        "--beverage": "orange",
        "--qty": 2,
        "--date": "2019-11-26T05:17:54.298Z"
      }),
      "1234,orange,2,2019-11-26T05:17:54.298Z"
    );
  });
});

describe("querryMessageFormatter", function() {
  it("should format the employee transaction to the required manner", function() {
    assert.strictEqual(
      queryMessageFormatter([
        {
          "--empId": "1234",
          "--beverage": "orange",
          "--qty": 2,
          "--date": "2019-11-26T05:17:54.298Z"
        },
        {
          "--empId": "1234",
          "--beverage": "orange",
          "--qty": 2,
          "--date": "2019-11-26T08:58:31.280Z"
        },
        {
          "--empId": "1234",
          "--beverage": "orange",
          "--qty": 2,
          "--date": "2019-11-26T08:58:32.247Z"
        },
        {
          "--empId": "1234",
          "--beverage": "orange",
          "--qty": 2,
          "--date": "2019-11-26T08:58:33.115Z"
        }
      ]),
      "Employee ID, Beverage, Quantity, Date\n1234,orange,2,2019-11-26T05:17:54.298Z\n1234,orange,2,2019-11-26T08:58:31.280Z\n1234,orange,2,2019-11-26T08:58:32.247Z\n1234,orange,2,2019-11-26T08:58:33.115Z\nTotal 8 juices"
    );
  });
});

describe("query", function() {
  const readFunc = function(path) {
    return '{"1211": [{"--empId": "1211","--beverage": "orange","--qty": 2,"--date": "2019-11-26T03:12:47.472Z"}]}';
  };

  it("should find all the transactions by the employee and return", function() {
    assert.deepStrictEqual(query({ "--empId": "1211" }, "path", readFunc), [
      {
        "--beverage": "orange",
        "--date": "2019-11-26T03:12:47.472Z",
        "--empId": "1211",
        "--qty": 2
      }
    ]);
  });
});
