var assert = require('assert');
var R = require('../source/index.js');
var eq = require('./shared/eq.js');


describe('zipObj', function() {
  it('combines an array of keys with an array of values into a single object', function() {
    eq(R.zipObj(['a', 'b', 'c'], [1, 2, 3]), {a: 1, b: 2, c: 3});
  });

  it('ignores extra values', function() {
    eq(R.zipObj(['a', 'b', 'c'], [1, 2, 3, 4, 5, 6, 7]), {a: 1, b: 2, c: 3});
  });

  it('ignores extra keys', function() {
    eq(R.zipObj(['a', 'b', 'c', 'd', 'e', 'f'], [1, 2, 3]), {a: 1, b: 2, c: 3});
  });

  it('last one in wins when there are duplicate keys', function() {
    eq(R.zipObj(['a', 'b', 'c', 'a'], [1, 2, 3, 'LAST']), {a: 'LAST', b: 2, c: 3});
  });

  it('preserves __proto__ as an own data property and lets later entries win', function() {
    var first = {first: true};
    var last = {last: true};
    var result = R.zipObj(['__proto__', 'a', '__proto__'], [first, 1, last]);

    assert.strictEqual(Object.getPrototypeOf(result), Object.prototype);
    assert.deepStrictEqual(Object.getOwnPropertyDescriptor(result, '__proto__'), {
      value: last, writable: true, enumerable: true, configurable: true
    });
    assert.deepStrictEqual(Object.keys(result), ['__proto__', 'a']);
    assert.strictEqual(result.a, 1);
    assert.strictEqual(result.first, undefined);
    assert.strictEqual(result.last, undefined);
    assert.strictEqual(JSON.stringify(result), '{"__proto__":{"last":true},"a":1}');
  });

  it('handles property-key coercion, symbols, and other inherited names', function() {
    var calls = 0;
    var key = {toString: function() { calls += 1; return '__proto__'; }};
    var sym = Symbol('key');
    var functionKey = function() {};
    functionKey.toString = function() { return 'functionKey'; };
    var result = R.zipObj([key, sym, 'constructor', 'toString', functionKey, null, 12], ['value', 'symbol', 3, 4, 5, 6, 7]);

    assert.strictEqual(calls, 1);
    assert.strictEqual(Object.getPrototypeOf(result), Object.prototype);
    assert.strictEqual(Object.prototype.hasOwnProperty.call(result, '__proto__'), true);
    assert.strictEqual(result.__proto__, 'value');
    assert.strictEqual(result[sym], 'symbol');
    assert.strictEqual(result.constructor, 3);
    assert.strictEqual(result.toString, 4);
    assert.strictEqual(result.functionKey, 5);
    assert.strictEqual(result['null'], 6);
    assert.strictEqual(result['12'], 7);
  });

});
