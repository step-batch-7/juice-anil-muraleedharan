const fileAccessFuncs = require("../src/fileAccesUtils");
const chai = require("chai");
const assert = chai.assert;

let { readFile, writeFile } = fileAccessFuncs;

describe("readFile", function() {
  const readFunc = function(path) {
    return "";
  };

  it("should read the contents of the file in the given path", function() {
    assert.strictEqual(readFile("path", readFunc), "");
  });
});

describe("writeFile", function() {
  const writeFunc = function(path, contents) {};

  it("should write to the file in the given path", function() {
    assert.strictEqual(writeFile("paath", "contents", writeFunc));
  });
});
