const saveFuncs = require("./save");
const queryFuncs = require("./query");
const fileAccessFunc = require("./fileAccesUtils");

let { save, saveMessageFormatter } = saveFuncs;
let { query, queryMessageFormatter } = queryFuncs;
let { readFile, writeFile } = fileAccessFunc;

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
  const avilableOperations = { "--save": save, "--query": query };
  let convertedInputs = [];
  convertedInputs[0] = avilableOperations[userArgs[0]];
  convertedInputs[1] = getObjectFromArray(userArgs.slice(1));
  convertedInputs[1]["--qty"] = getNumeric(convertedInputs[1]["--qty"]);
  convertedInputs[1]["--date"] = date;
  return convertedInputs;
};

const processInputs = function(slicedInputs, date, databasePath, validityFlag) {
  if (!validityFlag) {
    return "please enter valid inputs";
  }
  const messageFormatterOptions = {
    "--save": saveMessageFormatter,
    "--query": queryMessageFormatter
  };
  const convertedInputs = getConvertedInput(slicedInputs, date);
  const operation = convertedInputs[0];
  const datasToProcess = convertedInputs[1];
  const result = operation(datasToProcess, databasePath, readFile, writeFile);
  const messageFormatterFunc = messageFormatterOptions[slicedInputs[0]];
  const message = messageFormatterFunc(result);
  return message;
};

exports.getConvertedInput = getConvertedInput;
exports.getSlicedInput = getSlicedInput;
exports.operationAndDetailSeperator = operationAndDetailSeperator;
exports.getNumeric = getNumeric;
exports.getObjectFromArray = getObjectFromArray;
exports.processInputs = processInputs;
