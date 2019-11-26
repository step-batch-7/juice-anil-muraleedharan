const processInput = require("./src/processInput");
let { getSlicedInput, getConvertedInput } = processInput;
const save = require("./src/save").save;

const main = function(userArgs) {
  const slicedInputs = getSlicedInput(userArgs, 2);
  const date = new Date();
  const convertedInputs = getConvertedInput(slicedInputs, date);
  const operation = convertedInputs[0];
  const datasToProcess = convertedInputs[1];
  const result = operation(datasToProcess, "./database.json");
  console.log(result);
};

main(process.argv);
