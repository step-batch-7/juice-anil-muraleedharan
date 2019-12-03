const encoding = 'utf8';

const readFile = function(path, readFunc, isExistFunc) {
  if (!isExistFunc(path)) {
    return '[]';
  }
  const contents = readFunc(path, encoding);
  return contents;
};

const writeFile = function(path, contents, writeFunc) {
  writeFunc(path, contents, encoding);
};

module.exports = { readFile, writeFile };
