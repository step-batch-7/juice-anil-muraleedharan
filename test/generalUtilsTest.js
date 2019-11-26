const generalUtils = require('../src/generalUtils');
const assert = require('assert');
let {isIncludes} = generalUtils;
let {strictEqual} = assert;

describe("isIncludes", function(){
  it("should return true if the given array contains the given value", function(){
    strictEqual(isIncludes(['a','b','c'],'a'),true);
  });
  	it("should return false if the given list doesn't contains the value", function(){
      strictEqual(isIncludes(['a','b','c'],'z'),false);
    });
});