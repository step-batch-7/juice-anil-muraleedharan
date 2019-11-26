const parse = function(string) {
  return JSON.parse(string);
};

const stringify = function(obj) {
  return JSON.stringify(obj);
};

exports.parse = parse;
exports.stringify = stringify;