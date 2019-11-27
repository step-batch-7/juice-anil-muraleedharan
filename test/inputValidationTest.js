const isInputsValid = require("../src/inputValidation").isInputsValid;
const assert = require("assert");

describe("isInputsValid", function() {
  it("should return true if all the input options are valid for save", function() {
    assert.strictEqual(
      isInputsValid([
        "--save",
        "--empId",
        "1234",
        "--beverage",
        "orange",
        "--qty",
        "1"
      ]),
      true
    );
  });

  it("should return true if all the input options are valid for query", function() {
    assert.strictEqual(isInputsValid(["--query", "--empId", "1234"]), true);
  });

  it("should return false if any of the input is not valid for save", function() {
    assert.strictEqual(
      isInputsValid([
        "--save",
        "--empId",
        "abc",
        "--beverage",
        "orange12",
        "--qty",
        "1"
      ]),
      false
    );
  });

  it("should return false if any of the input is not valid for query", function() {
    assert.strictEqual(isInputsValid(["--query", "--empId", "abcd"]), false);
  });

  it("should return false if the operation is not valid", function() {
    assert.strictEqual(isInputsValid(["--report", "--empId", "1234"]), false);
  });
});
