const assert = require("assert");
const processInput = require("../src/processInput");
const savefunc = require("../src/save");
let { save } = savefunc;

let { deepStrictEqual, strictEqual } = assert;
let {
  getObjectFromArray,
  getNumeric,
  operationAndDetailSeperator,
  getSlicedInput,
  getConvertedInput,
  processInputs
} = processInput;
describe("getObjectFromArray", function() {
  it("it should return an object by taking alternative elements as keys and value", function() {
    deepStrictEqual(getObjectFromArray(["a", "A", "b", "B", "c", "C"]), {
      a: "A",
      b: "B",
      c: "C"
    });
  });
  it("it should return an empty object if the given array is empty", function() {
    deepStrictEqual(getObjectFromArray([]), {});
  });
});

describe("getNumeric", function() {
  it("should return the numeric value of the given string", function() {
    assert.strictEqual(getNumeric("1111"), 1111);
  });
});

describe("operationAndDetailSeperator", function() {
  it("should return an array which contains operation followed by a list of transaction details", function() {
    deepStrictEqual(
      operationAndDetailSeperator([
        "node",
        "filename",
        "--save",
        "--empId",
        "1111",
        "beverage",
        "orange",
        "qty ",
        "1"
      ]),
      ["--save", ["--empId", "1111", "beverage", "orange", "qty ", "1"]]
    );
  });
});

describe("getSlicedInput", function() {
  it("should return an array by cutting out the first to elements", function() {
    deepStrictEqual(
      getSlicedInput(
        [
          "node",
          "filename",
          "--save",
          "--empId",
          "1111",
          "beverage",
          "orange",
          "qty",
          "2"
        ],
        2
      ),
      ["--save", "--empId", "1111", "beverage", "orange", "qty", "2"]
    );
  });
});

describe("getConvertedInput", function() {
  it("should return an array by converting the operation to corresponding func references and qty to numeric", function() {
    date = new Date();
    convertedDate = date.toJSON();
    deepStrictEqual(
      getConvertedInput(
        ["--save", "--empId", "1111", "--beverage", "orange", "--qty", "2"],
        date
      ),
      [
        save,
        {
          "--empId": "1111",
          "--beverage": "orange",
          "--qty": 2,
          "--date": convertedDate
        }
      ]
    );
  });
});

describe("processInputs", function() {
  it("should return valid expected message if validity flag is true", function() {
    let date = new Date();
    let path = "./tmpSave.json";
    let expected = "taransaction compleated\nEmployee ID,Beverage,Quantity,Date\n1234,orange,1," +
    date.toJSON();
    assert.strictEqual(
      processInputs(
        ["--save", "--empId", "1234", "--beverage", "orange", "--qty", "1"],
        date,
        path,
        true
      ),expected
      
    );
  });
  
  	it("should return error message if the validitly flag is false", function(){
      assert.strictEqual(processInputs(["--query", "--empId", "1234"],false),"please enter valid inputs");
    });
});
