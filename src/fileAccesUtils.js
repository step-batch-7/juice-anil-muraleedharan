const fs = require("fs");
let { readFileSync, writeFileSync,existsSync } = fs;

const readFile = function(path) {
  let contents = readFileSync(path, "utf8");
  return contents;
};

const writeFile = function(path, contents) {
  writeFileSync(path, contents, "utf8");
};

exports.readFile = readFile;
exports.writeFile = writeFile;
