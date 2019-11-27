const fileAccessFuncs = require("../src/fileAccesUtils");
const assert = require('assert');

let { readFile, writeFile } = fileAccessFuncs;
let {strictEqual} = assert

describe("readFile", function() {
  const readFunc = function(path) {
    return "";
  };

  it("should read the contents of the file in the given path", function() {
    strictEqual(readFile("path", readFunc), "");
  });
});

describe("writeFile", function(){
  const writeFunc = function(path,contents) {
  };

  it("should write to the file in the given path", function(){
    strictEqual(writeFile("paath","contents",writeFunc),);
  });
});
