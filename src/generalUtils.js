const isEqual = function(value1, value2) {
  return value1 === value2;
};

const isIncludes = function(array, value) {
  return array.includes(value);
};

const isNumeric = function(value) {
  return Number.isInteger(+value);
};

exports.isIncludes = isIncludes;
exports.isEqual = isEqual;
exports.isNumeric = isNumeric;