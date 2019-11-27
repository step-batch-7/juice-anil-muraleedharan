const generalUtils = require("../src/generalUtils");
const chai = require("chai");
const assert = chai.assert;

let {
  isIncludes,
  isEqual,
  isNumeric,
  getNumeric,
  isPositiveNumeric,
  isPresent
} = generalUtils;

describe("isIncludes", function() {
  it("should return true if the given array contains the given value", function() {
    assert.strictEqual(isIncludes(["a", "b", "c"], "a"), true);
  });

  it("should return false if the given list doesn't contains the value", function() {
    assert.strictEqual(isIncludes(["a", "b", "c"], "z"), false);
  });
});

describe("isEqual", function() {
  it("should return true if two equal strings are equal", function() {
    assert.strictEqual(isEqual("abc", "abc"), true);
  });

  it("should return false if two strings are not equal", function() {
    assert.strictEqual(isEqual("abc", "abcd"), false);
  });

  it("should return true if two numbers are equal", function() {
    assert.strictEqual(isEqual(123, 123), true);
  });

  it("should return false if two numbers are not equal", function() {
    assert.strictEqual(isEqual(123, 1234), false);
  });
});

describe("isPositiveNumeric", function() {
  it("should return true if the given value is a string of positive numeric", function() {
    assert.strictEqual(isPositiveNumeric("123"), true);
  });

  it("should return false if the given value is a string of negative numeric", function() {
    assert.strictEqual(isPositiveNumeric("-123"), false);
  });

  it("should return false if the given value is not a string of numeric", function() {
    assert.strictEqual(isPositiveNumeric("abc"), false);
  });
});

describe("getNumeric", function() {
  it("should return the numeric value corresponding to the given string", function() {
    assert.strictEqual(getNumeric("123"), 123);
  });

  it("should return the NaN if the string content is not a number", function() {
    assert.isNaN(getNumeric("abc"));
  });
});

describe("isNumeric", function() {
  it("should return true if the given value is a string of numeric", function() {
    assert.strictEqual(isNumeric("123"), true);
  });

  it("should return false if the given value is not a string of numeric", function() {
    assert.strictEqual(isNumeric("abc"), false);
  });
});

describe("isPresent", function() {
  it("should return true if the key is already present", function() {
    assert.strictEqual(isPresent({ a: "A" }, "a"), true);
  });

  it("should return false if the key is not present", function() {
    assert.strictEqual(isPresent({ a: "A" }, "b"), false);
  });
});
