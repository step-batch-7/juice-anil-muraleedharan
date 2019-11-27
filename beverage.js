const processInput = require("./src/processInput");
let { getSlicedInput, processInputs } = processInput;
const isInputsValid = require("./src/inputValidation").isInputsValid;

const main = function(userArgs) {
  const slicedInputs = getSlicedInput(userArgs, 2);
  const validityFlag = isInputsValid(slicedInputs);
  const date = (new Date()).toJSON();
  const databasePath = "./database.json";
  const message = processInputs(slicedInputs, date, databasePath, validityFlag);
  console.log(message);
};

main(process.argv);
