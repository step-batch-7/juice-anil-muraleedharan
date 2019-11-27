const generalUtils = require("../src/generalUtils");
let { isIncludes, isEqual, isNumeric, isPositiveNumeric } = generalUtils;

const isInputsValid = function(userArgs) {
  const expectedInputLengthSave = 7;
  const expectedInputLengthQuery = 3;
  const length = userArgs.length;
  const operation = userArgs[0];
  const inputOptions = [userArgs[1], userArgs[3], userArgs[5]];
  const validOperations = ["--save", "--query"];
  
  const isValidOperation = isIncludes(validOperations, operation);
  if (!isValidOperation) {
    return false;
  }
  const isOperationSave = isEqual(operation, "--save");
  const isOperationQuery = isEqual(operation, "--query");
  
  const isLengthMatchesSave = isEqual(length, expectedInputLengthSave);
  const isLengthMatchesQuery = isEqual(length, expectedInputLengthQuery);
  
  const isEmpIdExist = isIncludes(inputOptions, "--empId");
  const isBeverageExist = isIncludes(inputOptions, "--beverage");
  const isQtyExist = isIncludes(inputOptions, "--qty");

  const indexOfEmpid = userArgs.indexOf("--empId");
  const indexOfQty = userArgs.indexOf("--qty");
  const indexOfBeverage = userArgs.indexOf("--beverage");

  const isValidEmpId = isPositiveNumeric(userArgs[indexOfEmpid + 1]) && isEmpIdExist;
  const isValidQty = isPositiveNumeric(userArgs[indexOfQty + 1]) && isQtyExist;
  const isValidBeverage =
    !isNumeric(userArgs[indexOfBeverage + 1]) && isBeverageExist;

  const saveFlag =
    isOperationSave &&
    isLengthMatchesSave &&
    isValidEmpId &&
    isValidBeverage &&
    isValidQty;
  
    const queryFlag = isOperationQuery && isLengthMatchesQuery && isValidEmpId;
  
    if (!(queryFlag || saveFlag)) {
    return false;
  }
  return true;
};

exports.isInputsValid = isInputsValid;
