const processInput = require('./src/processInput');
let { getSlicedInput, processInputs } = processInput;
const fileAccessFunc = require('./src/fileAccesUtils');
let { readFile, writeFile } = fileAccessFunc;
const { timeStamp, getDataStorePath } = require('./src/config');

const main = function(userArgs, envVars) {
  const slicedInputs = getSlicedInput(userArgs, 2);
  const validityFlag = true;
  const date = timeStamp.bind(null, envVars)();
  const databasePath = getDataStorePath(envVars);
  const processInputArgs = {
    date: date,
    databasePath: databasePath,
    validityFlag: validityFlag,
    readFile: readFile,
    writeFile: writeFile
  };
  const message = processInputs(slicedInputs, processInputArgs);
  console.log(message);
};

main(process.argv, process.env);
