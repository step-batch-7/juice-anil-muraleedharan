const fs = require("fs");
let { readFileSync, writeFileSync } = fs;

const readFile = function(path, readFunc) {
  let contents = readFunc(path, "utf8");
  return contents;
};

const writeFile = function(path, contents, writeFunc) {
  writeFunc(path, contents, "utf8");
};

exports.readFile = readFile;
exports.writeFile = writeFile;
