const save = require("./save").save;

// const processInput = function(cmndLineArgs, date) {
//   const organisedArgs = operationAndDetailSeperator(cmndLineArgs);
//   const optionsFunctions = { "--save": saveAcknowledge };
//   const outputString = optionsFunctions[organisedArgs[0]](
//     organisedArgs[1],
//     date
//   );
//   return outputSting;
// };

const getObjectFromArray = function(array) {
  const length = array.length;
  let derrivedObject = {};
  for (let index = 0; index < length; index += 2) {
    let key = array[index];
    let value = array[index + 1];
    derrivedObject[key] = value;
  }
  return derrivedObject;
};

const getNumeric = function(string) {
  let numeric = Number(string);
  return numeric;
};

const operationAndDetailSeperator = function(commandLineArguments) {
  let seperatedDatas = [];
  const requiredArgs = commandLineArguments.slice(2);
  const operation = requiredArgs[0];
  const transactionDetails = requiredArgs.slice(1);
  seperatedDatas.push(operation, transactionDetails);
  return seperatedDatas;
};

const getSlicedInput = function(array, length) {
  const slicedInput = array.slice(length);
  return slicedInput;
};

const getConvertedInput = function(userArgs, date) {
  const avilableOperations = { "--save": save };
  let convertedInputs = [];
  convertedInputs[0] = avilableOperations[userArgs[0]];
  convertedInputs[1] = getObjectFromArray(userArgs.slice(1));
  convertedInputs[1]["--qty"] = getNumeric(convertedInputs[1]["--qty"]);
  convertedInputs[1]["--date"] = date.toJSON();
  return convertedInputs;
};

exports.getConvertedInput = getConvertedInput;
exports.getSlicedInput = getSlicedInput;
exports.operationAndDetailSeperator = operationAndDetailSeperator;
exports.getNumeric = getNumeric;
exports.getObjectFromArray = getObjectFromArray;
