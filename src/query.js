const parse = require('./jsonUtils').parse;
const fs = require('fs');

let { readFileSync, existsSync } = fs;

const isMatch = function(queryFilters, element) {
  let matchFlag = true;
  for (let options in queryFilters) {
    let optionToCheck = queryFilters[options];
    let optionOfCurrentData = element[options];
    if (options === '--date') {
      let dateLength = optionToCheck.length;
      optionOfCurrentData = optionOfCurrentData.slice(0, dateLength);
    }
    matchFlag = matchFlag && optionToCheck === optionOfCurrentData;
  }
  return matchFlag;
};

const addQuantity = function(previousSum, currentData) {
  let sum = previousSum + currentData['--qty'];
  return sum;
};

const getConcattedTransactionDatas = function(transactionData) {
  const empId = transactionData['--empId'];
  const beverage = transactionData['--beverage'];
  const qty = transactionData['--qty'];
  const date = transactionData['--date'];
  let concattedData = [empId, beverage, qty, date].join(',');
  return concattedData;
};

const queryMessageFormatter = function(transationsHistory) {
  let formattedMessage = 'Employee ID, Beverage, Quantity, Date\n';
  listOfConcattedDatas = transationsHistory.map(getConcattedTransactionDatas);
  formattedMessage += listOfConcattedDatas.join('\n');
  const totalQuantity = transationsHistory.reduce(addQuantity, 0);
  const juiceSingOrPlural = totalQuantity === 1 ? 'Juice' : 'Juices';
  formattedMessage += `\nTotal: ${totalQuantity} ${juiceSingOrPlural}`;
  return formattedMessage;
};

const query = function(Options, path, fileAccessFunc) {
  const queryOptions = Options['cmndLineOptions'];
  const readFile = fileAccessFunc.readFunc;
  const data = readFile(path, readFileSync, existsSync);
  const database = parse(data);
  const transactionHistory = database.filter(isMatch.bind(null, queryOptions));
  return transactionHistory;
};

module.exports = {
  query,
  isMatch,
  getConcattedTransactionDatas,
  queryMessageFormatter,
  addQuantity
};
