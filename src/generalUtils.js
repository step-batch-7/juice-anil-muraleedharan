const isPresent = function(object, key) {
  return Object.keys(object).includes(key);
};

const isEqual = function(value1, value2) {
  return value1 === value2;
};

const isIncludes = function(array, value) {
  return array.includes(value);
};

const getNumeric = function(value) {
  return Number(value);
};

const isPositiveNumeric = function(value) {
  return getNumeric(value) > 0;
};

const isNumeric = function(value) {
  return Number.isInteger(Number(value));
};

module.exports = {
  isIncludes,
  isEqual,
  getNumeric,
  isPositiveNumeric,
  isNumeric,
  isPresent
};
