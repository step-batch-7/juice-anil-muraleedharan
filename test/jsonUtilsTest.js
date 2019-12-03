const chai = require('chai');
const assert = chai.assert;
const jsonUtils = require('../src/jsonUtils');
let { parse, stringify } = jsonUtils;

describe('parse', function() {
  it('should return the corresponding object of the given string', function() {
    assert.deepStrictEqual(parse('{"a":"A","b":"B","c":"C"}'), {
      a: 'A',
      b: 'B',
      c: 'C'
    });
  });
});

describe('stringify', function() {
  it('should return an string of the given object', function() {
    assert.deepStrictEqual(
      stringify({ a: 'A', b: 'B', c: 'C' }),
      '{"a":"A","b":"B","c":"C"}'
    );
  });
});
