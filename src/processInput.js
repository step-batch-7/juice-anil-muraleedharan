const saveFuncs = require('./save');
const queryFuncs = require('./query');

let { save, saveMessageFormatter } = saveFuncs;
let { query, queryMessageFormatter } = queryFuncs;

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

const getConvertedInput = function(userArgs) {
  const avilableOperations = { '--save': save, '--query': query };
  let convertedInputs = [];
  convertedInputs[0] = avilableOperations[userArgs[0]];
  convertedInputs[1] = getObjectFromArray(userArgs.slice(1));
  return convertedInputs;
};

const processInputs = function(slicedInputs, ProcessArgs) {
  const date = ProcessArgs.date;
  const databasePath = ProcessArgs.databasePath;
  const validityFlag = ProcessArgs.validityFlag;
  const readFunc = ProcessArgs.readFile;
  const writeFunc = ProcessArgs.writeFile;

  if (!validityFlag) {
    return 'please enter valid inputs';
  }
  const messageFormatterOptions = {
    '--save': saveMessageFormatter,
    '--query': queryMessageFormatter
  };
  const convertedInputs = getConvertedInput(slicedInputs);
  const operation = convertedInputs[0];
  const datasToProcess = convertedInputs[1];
  const result = operation(
    { cmndLineOptions: datasToProcess, date: date },
    databasePath,
    {
      readFunc: readFunc,
      writeFunc: writeFunc
    }
  );
  const messageFormatterFunc = messageFormatterOptions[slicedInputs[0]];
  const message = messageFormatterFunc(result);
  return message;
};

module.exports = {
  getConvertedInput,
  getSlicedInput,
  operationAndDetailSeperator,
  getNumeric,
  getObjectFromArray,
  processInputs
};
