const utilities = require("./generalUtils");
const fs = require("fs");
let {readFileSync,writeFileSync} = fs
let { isPresent } = utilities;

const combineDataToSave = function(previousDatabase, newData) {
  // let empId = newData["--empId"];
  // let isAlreadyExist = isPresent(previousDatabase, empId);
  // if (isAlreadyExist) {
  // previousDatabase[empId].push(newData);
  previousDatabase.push(newData);
  return previousDatabase;
  // } else {
  //   previousDatabase[empId] = [newData];
  //   return previousDatabase;
  // }
};

const saveMessageFormatter = function(transactionDetails) {
  let formattedMessage = "";
  const empId = transactionDetails["--empId"];
  const beverage = transactionDetails["--beverage"];
  const qty = transactionDetails["--qty"];
  const date = transactionDetails["--date"];
  formattedMessage += "taransaction compleated\n";
  formattedMessage += "Employee ID,Beverage,Quantity,Date\n";
  formattedMessage =
    formattedMessage + empId + "," + beverage + "," + qty + "," + date;
  return formattedMessage;
};

const save = function(transactionDetails, path, readFile, writeFile) {
  let database = JSON.parse(readFile(path, readFileSync));
  const combinedData = combineDataToSave(database, transactionDetails);
  const dataToSave = JSON.stringify(combinedData, null, 2);
  writeFile(path, dataToSave, writeFileSync);
  return transactionDetails;
};

exports.save = save;
exports.combineDataToSave = combineDataToSave;
exports.saveMessageFormatter = saveMessageFormatter;
