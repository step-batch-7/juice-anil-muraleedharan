const jsonUtilities = require('./jsonUtils');
const fs = require('fs');
let { parse, stringify } = jsonUtilities;
let { readFileSync, writeFileSync, existsSync } = fs;

const combineDataToSave = function(previousDatabase, newData) {
  previousDatabase.push(newData);
  return previousDatabase;
};

const saveMessageFormatter = function(transactionDetails) {
  let formattedMessage = '';
  const empId = transactionDetails['--empId'];
  const beverage = transactionDetails['--beverage'];
  const qty = transactionDetails['--qty'];
  const date = transactionDetails['--date'];
  formattedMessage += 'Transaction Recorded:\n';
  formattedMessage += 'Employee ID,Beverage,Quantity,Date\n';
  formattedMessage += [empId, beverage, qty, date].join(',');
  return formattedMessage;
};

const qtyToNumeric = function(transactionDetails) {
  transactionDetails['--qty'] = +transactionDetails['--qty'];
};

const save = function(transactionData, path, fileAccessFuncs) {
  const transactionDetails = transactionData['cmndLineOptions'];
  const date = transactionData['date'].toJSON();
  transactionDetails['--date'] = date;
  qtyToNumeric(transactionDetails);
  const readFile = fileAccessFuncs.readFunc;
  const writeFile = fileAccessFuncs.writeFunc;
  let database = parse(readFile(path, readFileSync, existsSync));
  const combinedData = combineDataToSave(database, transactionDetails);
  const dataToSave = stringify(combinedData, null, 2);
  writeFile(path, dataToSave, writeFileSync);
  return transactionDetails;
};

module.exports = { save, combineDataToSave, saveMessageFormatter };
