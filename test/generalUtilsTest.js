const generalUtils = require('../src/generalUtils');
const assert = require('assert');
let {isIncludes,isEqual,isNumeric} = generalUtils;
let {strictEqual} = assert;

describe("isIncludes", function(){
  it("should return true if the given array contains the given value", function(){
    strictEqual(isIncludes(['a','b','c'],'a'),true);
  });
  	it("should return false if the given list doesn't contains the value", function(){
      strictEqual(isIncludes(['a','b','c'],'z'),false);
    });
});

describe("isEqual", function(){
  it("should return true if two equal strings are equal", function(){
    assert.strictEqual(isEqual('abc','abc'),true);
  });
  it("should return false if two strings are not equal", function(){
    assert.strictEqual(isEqual('abc','abcd'),false);
  });
  it("should return true if two numbers are equal", function(){
    assert.strictEqual(isEqual(123,123),true);
  });
  it("should return false if two numbers are not equal", function(){
    assert.strictEqual(isEqual(123,1234),false);
  });
});

describe("isNumeric", function(){
  it("should return true if the given value is a string of numeric", function(){
    assert.strictEqual(isNumeric("123"),true);
  });
  it("should return false if the given value is not a string of numeric", function(){
    assert.strictEqual(isNumeric("abc"),false);
  });
});