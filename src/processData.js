// const getObjectFromString = function(string) {
//   let derrivedObject = JSON.parse(string);
//   return derrivedObject;
// };

// const isPresent = function(object, key) {
//   return Object.keys(object).includes(key);
// };

// const save = function(previousDatabase, newData) {
//   let empId = newData["empId"];
//   let isAlreadyExist = isPresent(previousDatabase, empId);
//   if (isAlreadyExist) {
//     previousDatabase[empId].push(newData);
//     return previousDatabase;
//   }
//   previousDatabase[empId] = [newData];
//   return previousDatabase;
// };

// exports.getObjectFromString = getObjectFromString;
// exports.isPresent = isPresent;
// exports.save = save;
