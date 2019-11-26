// const assert = require("assert");
// const processData = require("../src/processData");
// let { strictEqual, deepStrictEqual } = assert;
// let { getObjectFromString, isPresent, save } = processData;

// describe("getObjectFromString", function() {
//   it("should return an object of the given string", function() {
//     deepStrictEqual(getObjectFromString('{"a":"A", "b":"B", "c":"C"}'), {
//       a: "A",
//       b: "B",
//       c: "C"
//     });
//   });
// });

// describe("isPresent", function() {
//   it("should return true if the key is already present", function() {
//     strictEqual(isPresent({ a: "A" }, "a"), true);
//   });

//   it("should return false if the key is not present", function() {
//     strictEqual(isPresent({ a: "A" }, "b"), false);
//   });
// });

// describe("save", function() {
//   it("should return an latest object if the empId already exists", function() {
//     deepStrictEqual(
//       save(
//         {
//           "1111": [
//             {
//               empId: "1111",
//               beverage: "orange",
//               qty: "1",
//               date: "2019-11-23T04:35:27.776Z"
//             }
//           ]
//         },
//         {
//           empId: "1111",
//           beverage: "orange",
//           qty: "1",
//           date: "2019-11-24T04:35:27.776Z"
//         }
//       ),
//       {
//         "1111": [
//           {
//             empId: "1111",
//             beverage: "orange",
//             qty: "1",
//             date: "2019-11-23T04:35:27.776Z"
//           },
//           {
//             empId: "1111",
//             beverage: "orange",
//             qty: "1",
//             date: "2019-11-24T04:35:27.776Z"
//           }
//         ]
//       }
//     );
//   });
//   it("should return an latest object by inserting a new element with empId as key", function() {
//     deepStrictEqual(
//       save(
//         {
//           "1111": [
//             {
//               empId: "1111",
//               beverage: "orange",
//               qty: "1",
//               date: "2019-11-23T04:35:27.776Z"
//             }
//           ]
//         },
//         {
//           empId: "1112",
//           beverage: "orange",
//           qty: "1",
//           date: "2019-11-24T04:35:27.776Z"
//         }
//       ),
//       {
//         "1111": [
//           {
//             empId: "1111",
//             beverage: "orange",
//             qty: "1",
//             date: "2019-11-23T04:35:27.776Z"
//           }
//         ],
//         "1112": [
//           {
//             empId: "1112",
//             beverage: "orange",
//             qty: "1",
//             date: "2019-11-24T04:35:27.776Z"
//           }
//         ]
//       }
//     );
//   });
// });
