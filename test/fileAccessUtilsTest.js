const fileAccessFuncs = require('../src/fileAccesUtils');
const chai = require('chai');
const assert = chai.assert;

let { readFile, writeFile } = fileAccessFuncs;

describe('readFile', function() {
  const isExistFunc = function(path) {
    return path === 'path';
  };

  const readFunc1 = function(path, encoding) {
    return '';
  };

  const readFunc2 = function(path, encoding) {
    return '[]';
  };

  it('should read the contents of the file in the given path', function() {
    assert.strictEqual(readFile('path', readFunc1, isExistFunc), '');
  });

  it('should return an string of empty array if the file does not exist', function() {
    assert.strictEqual(
      readFile('some other path', readFunc2, isExistFunc),
      '[]'
    );
  });
});

describe('writeFile', function() {
  const writeFunc = function(path, contents) {};

  it('should write to the file in the given path', function() {
    assert.strictEqual(writeFile('path', 'contents', writeFunc));
  });
});
