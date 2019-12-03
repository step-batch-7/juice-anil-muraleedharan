const parse = function(string) {
  return JSON.parse(string);
};

const stringify = function(obj) {
  return JSON.stringify(obj);
};

module.exports = { parse, stringify };
