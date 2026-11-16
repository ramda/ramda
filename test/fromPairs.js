var assert = require('assert');
var R = require('../source/index.js');
var eq = require('./shared/eq.js');


describe('fromPairs', function() {

  it('combines an array of two-element arrays into an object', function() {
    eq(R.fromPairs([['a', 1], ['b', 2], ['c', 3]]), {a: 1, b: 2, c: 3});
  });

  it('gives later entries precedence over earlier ones', function() {
    eq(R.fromPairs([['x', 1], ['x', 2]]), {x: 2});
  });

  it('preserves __proto__ as an own data property and lets later entries win', function() {
    var first = {first: true};
    var last = {last: true};
    var result = R.fromPairs([['__proto__', first], ['a', 1], ['__proto__', last]]);

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
    var result = R.fromPairs([[key, 'value'], [sym, 'symbol'], ['constructor', 3], ['toString', 4], [functionKey, 5], [null, 6], [12, 7]]);

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
