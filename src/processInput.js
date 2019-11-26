const save = require("./save").save;
const query = require('./query').query;

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
  const avilableOperations = { "--save": save , "--query": query};
  let convertedInputs = [];
  convertedInputs[0] = avilableOperations[userArgs[0]];
  convertedInputs[1] = getObjectFromArray(userArgs.slice(1));
  convertedInputs[1]["--qty"] = getNumeric(convertedInputs[1]["--qty"]);
  convertedInputs[1]["--date"] = date.toJSON();
  return convertedInputs;
};

const processInputs = function(slicedInputs,date,databasePath,validityFlag) {
  if(!validityFlag) {
    return "please enter valid inputs";
  }
  const convertedInputs = getConvertedInput(slicedInputs, date);
  const operation = convertedInputs[0];
  const datasToProcess = convertedInputs[1];
  const message = operation(datasToProcess, databasePath);
  return message;
};

exports.getConvertedInput = getConvertedInput;
exports.getSlicedInput = getSlicedInput;
exports.operationAndDetailSeperator = operationAndDetailSeperator;
exports.getNumeric = getNumeric;
exports.getObjectFromArray = getObjectFromArray;
exports.processInputs = processInputs;
