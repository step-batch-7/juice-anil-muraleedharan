const queryFunctions = require("../src/query");
const assert = require("assert");

let { strictEqual, deepStrictEqual } = assert;

let {
  query,
  queryMessageFormatter,
  getConcattedTransactionDatas,
  addQuantity,
  getEmployeeTransactions
} = queryFunctions;

describe("addQuantity", function() {
  it("should add current datas qty field with the previous value", function() {
    strictEqual(
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
    deepStrictEqual(
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
    deepStrictEqual(
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
    strictEqual(
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
    strictEqual(
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
  it("should find all the transactions by the employee and return as a formatted string", function() {
    strictEqual(
      query({ "--empId": "1211" }, "./tmpQuery.json"),
      "Employee ID, Beverage, Quantity, Date\n1211,orange,2,2019-11-26T03:12:47.472Z\n1211,apple,2,2019-11-26T03:12:47.472Z\nTotal 4 juices"
    );
  });
});
