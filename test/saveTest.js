const assert = require("assert");
const saveFunctions = require("../src/save");
let {
  save,
  saveMessageFormatter,
  combineDataToSave,
  isPresent
} = saveFunctions;
let { deepStrictEqual, strictEqual } = assert;

describe("isPresent", function() {
  it("should return true if the key is already present", function() {
    strictEqual(isPresent({ a: "A" }, "a"), true);
  });

  it("should return false if the key is not present", function() {
    strictEqual(isPresent({ a: "A" }, "b"), false);
  });
});

describe("combineDataToSave", function() {
  it("should return an latest object if the empId already exists", function() {
    deepStrictEqual(
      combineDataToSave(
        {
          "1111": [
            {
              "--empId": "1111",
              "--beverage": "orange",
              "--qty": "1",
              "--date": "2019-11-23T04:35:27.776Z"
            }
          ]
        },
        {
          "--empId": "1111",
          "--beverage": "orange",
          "--qty": "1",
          "--date": "2019-11-23T04:35:27.776Z"
        }
      ),
      {
        "1111": [
          {
            "--empId": "1111",
            "--beverage": "orange",
            "--qty": "1",
            "--date": "2019-11-23T04:35:27.776Z"
          },
          {
            "--empId": "1111",
            "--beverage": "orange",
            "--qty": "1",
            "--date": "2019-11-23T04:35:27.776Z"
          }
        ]
      }
    );
  });
  it("should return an latest object by inserting a new element with empId as key", function() {
    deepStrictEqual(
      combineDataToSave(
        {
          "1111": [
            {
              "--empId": "1111",
              "--beverage": "orange",
              "--qty": "1",
              "--date": "2019-11-23T04:35:27.776Z"
            }
          ]
        },
        {
          "--empId": "1112",
          "--beverage": "orange",
          "--qty": "1",
          "--date": "2019-11-23T04:35:27.776Z"
        }
      ),
      {
        "1111": [
          {
            "--empId": "1111",
            "--beverage": "orange",
            "--qty": "1",
            "--date": "2019-11-23T04:35:27.776Z"
          }
        ],
        "1112": [
          {
            "--empId": "1112",
            "--beverage": "orange",
            "--qty": "1",
            "--date": "2019-11-23T04:35:27.776Z"
          }
        ]
      }
    );
  });
});

describe("saveMessageFormatter", function() {
  it("should return an message by combining text and current transaction details", function() {
    strictEqual(
      saveMessageFormatter({
        "--empId": "1211",
        "--beverage": "orange",
        "--qty": 2,
        "--date": "2019-11-26T03:12:47.472Z"
      }),
      "taransaction compleated\nEmployee ID,Beverage,Quantity,Date\n1211,orange,2,2019-11-26T03:12:47.472Z"
    );
  });
});

describe("save", function() {
  it("should return an save formatted message corresponding to the transaction details", function() {
    assert.strictEqual(
      save(
        {
          "--empId": "1211",
          "--beverage": "orange",
          "--qty": 2,
          "--date": "2019-11-26T03:12:47.472Z"
        },
        "./tmp.json"
      ),
      "taransaction compleated\nEmployee ID,Beverage,Quantity,Date\n1211,orange,2,2019-11-26T03:12:47.472Z"
    );
  });
});
