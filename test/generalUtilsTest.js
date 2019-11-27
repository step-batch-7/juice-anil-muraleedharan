const generalUtils = require("../src/generalUtils");
const assert = require("assert");
let {
  isIncludes,
  isEqual,
  isNumeric,
  getNumeric,
  isPositiveNumeric
} = generalUtils;
let { strictEqual } = assert;

describe("isIncludes", function() {
  it("should return true if the given array contains the given value", function() {
    strictEqual(isIncludes(["a", "b", "c"], "a"), true);
  });

  it("should return false if the given list doesn't contains the value", function() {
    strictEqual(isIncludes(["a", "b", "c"], "z"), false);
  });
});

describe("isEqual", function() {
  it("should return true if two equal strings are equal", function() {
    strictEqual(isEqual("abc", "abc"), true);
  });

  it("should return false if two strings are not equal", function() {
    strictEqual(isEqual("abc", "abcd"), false);
  });

  it("should return true if two numbers are equal", function() {
    strictEqual(isEqual(123, 123), true);
  });

  it("should return false if two numbers are not equal", function() {
    strictEqual(isEqual(123, 1234), false);
  });
});

describe("isPositiveNumeric", function() {
  it("should return true if the given value is a string of positive numeric", function() {
    strictEqual(isPositiveNumeric("123"), true);
  });

  it("should return false if the given value is a string of negative numeric", function() {
    strictEqual(isPositiveNumeric("-123"), false);
  });

  it("should return false if the given value is not a string of numeric", function() {
    strictEqual(isPositiveNumeric("abc"), false);
  });
});

describe("getNumeric", function() {
  it("should return the numeric value corresponding to the given string", function() {
    assert.strictEqual(getNumeric("123"), 123);
  });

  it("should return the NaN if the string content is not a number", function() {
    assert.strictEqual(getNumeric("abc"), NaN);
  });
});

describe("isNumeric", function() {
  it("should return true if the given value is a string of numeric", function() {
    strictEqual(isNumeric("123"), true);
  });

  it("should return false if the given value is not a string of numeric", function() {
    strictEqual(isNumeric("abc"), false);
  });
});