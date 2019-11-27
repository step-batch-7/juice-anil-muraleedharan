const parse = require("./jsonUtils").parse;
const isIncludes = require("./generalUtils").isIncludes;
const readFileSync = require("fs").readFileSync;

const getEmployeeTransactions = function(database, empId) {
  const empIds = Object.keys(database);
  const isAlreadyExist = isIncludes(empIds, empId);
  if (isAlreadyExist) {
    return database[empId];
  }
  return [];
};

const addQuantity = function(previousSum, currentData) {
  let sum = previousSum + currentData["--qty"];
  return sum;
};

const getConcattedTransactionDatas = function(transactionData) {
  const empId = transactionData["--empId"];
  const beverage = transactionData["--beverage"];
  const qty = transactionData["--qty"];
  const date = transactionData["--date"];
  let concattedData = empId + "," + beverage + "," + qty + "," + date;
  return concattedData;
};

const queryMessageFormatter = function(transationsHistory) {
  let formattedMessage = "Employee ID, Beverage, Quantity, Date\n";
  listOfConcattedDatas = transationsHistory.map(getConcattedTransactionDatas);
  formattedMessage += listOfConcattedDatas.join("\n");
  const totalQuantity = transationsHistory.reduce(addQuantity, 0);
  formattedMessage += "\nTotal " + totalQuantity + " juices";
  return formattedMessage;
};

const query = function(details, path, readFile) {
  const datas = readFile(path, readFileSync);
  const database = parse(datas);
  const currentEmpId = details["--empId"];
  const transactionHistory = getEmployeeTransactions(database, currentEmpId);
  return transactionHistory;
};

exports.query = query;
exports.getEmployeeTransactions = getEmployeeTransactions;
exports.getConcattedTransactionDatas = getConcattedTransactionDatas;
exports.queryMessageFormatter = queryMessageFormatter;
exports.addQuantity = addQuantity;
