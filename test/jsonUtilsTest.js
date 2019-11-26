const assert = require("assert");
const jsonUtils = require("../src/jsonUtils");
let { parse, stringify } = jsonUtils;
let { deepStrictEqual } = assert;

describe("parse", function() {
  it("should return the corresponding object of the given string", function() {
    deepStrictEqual(parse('{"a":"A","b":"B","c":"C"}'), {
      a: "A",
      b: "B",
      c: "C"
    });
  });
});

describe("stringify", function() {
  it("should return an string of the given object", function() {
    deepStrictEqual(
      stringify({ a: "A", b: "B", c: "C" }),
      '{"a":"A","b":"B","c":"C"}'
    );
  });
});
