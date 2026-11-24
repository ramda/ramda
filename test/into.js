var assert = require('assert');
var R = require('../source/index.js');
var eq = require('./shared/eq.js');


describe('into', function() {
  var add = R.add;
  var isOdd = function(b) { return b % 2 !== 0; };
  var addXf = {
    '@@transducer/step': add,
    '@@transducer/init': R.always(0),
    '@@transducer/result': R.identity
  };

  it('transduces into arrays', function() {
    eq(R.into([], R.map(add(1)), [1, 2, 3, 4]), [2, 3, 4, 5]);
    eq(R.into([], R.filter(isOdd), [1, 2, 3, 4]), [1, 3]);
    eq(R.into([], R.compose(R.map(add(1)), R.take(2)), [1, 2, 3, 4]), [2, 3]);
  });

  it('transduces into strings', function() {
    eq(R.into('', R.map(add(1)), [1, 2, 3, 4]), '2345');
    eq(R.into('', R.filter(isOdd), [1, 2, 3, 4]), '13');
    eq(R.into('', R.compose(R.map(add(1)), R.take(2)), [1, 2, 3, 4]), '23');
  });

  it('transduces into objects', function() {
    eq(R.into({}, R.identity, [['a', 1], ['b', 2]]), {a: 1, b: 2});
    eq(R.into({}, R.identity, [{a: 1}, {b: 2, c: 3}]), {a: 1, b: 2, c: 3});
  });

  it('appends to a fresh copy of the initial array on each call', function() {
    var initial = Object.freeze([10]);
    var append = R.into(initial, R.map(R.inc));

    eq(append([1, 2]), [10, 2, 3]);
    eq(append([3]), [10, 4]);
    eq(append([]), [10]);
    assert.notStrictEqual(append([]), initial);
    eq(initial, [10]);
  });

  it('preserves holes in the initial array', function() {
    var initial = Array(3);
    initial[1] = 'middle';
    var result = R.into(initial, R.identity, ['last']);

    eq(result.length, 4);
    eq(0 in result, false);
    eq(result[1], 'middle');
    eq(2 in result, false);
    eq(result[3], 'last');
  });

  it('copies the indexed values of an array-like accumulator', function() {
    var initial = {0: 'first', length: 1};

    eq(R.into(initial, R.identity, ['last']), ['first', 'last']);
    eq(initial, {0: 'first', length: 1});
  });

  it('appends to the initial string', function() {
    eq(R.into('total: ', R.map(R.inc), [1, 2]), 'total: 23');
    eq(R.into('total: ', R.filter(R.F), [1, 2]), 'total: ');
  });

  it('merges into a shallow copy of the initial object', function() {
    var unit = {name: 'ms'};
    var initial = Object.freeze({unit: unit, value: 0});
    var result = R.into(initial, R.identity, [['value', 3]]);

    eq(result, {unit: unit, value: 3});
    assert.strictEqual(result.unit, unit);
    eq(initial, {unit: unit, value: 0});
    assert.notStrictEqual(R.into(initial, R.identity, []), initial);
  });

  it('keeps only the initial object\'s own enumerable keys, including symbols', function() {
    var key = Symbol('unit');
    var initial = Object.create({inherited: true});
    initial[key] = 'ms';
    Object.defineProperty(initial, 'hidden', {value: true});
    var result = R.into(initial, R.identity, [{value: 3}]);

    eq(result[key], 'ms');
    eq(result.value, 3);
    eq('inherited' in result, false);
    eq('hidden' in result, false);
  });

  it('keeps the initial array and the scan seed in order', function() {
    eq(R.into([10], R.scan(R.add, 0), [1, 2]), [10, 0, 1, 3]);
    eq(R.into([10], R.scan(R.add, 0), []), [10, 0]);
  });

  it('dispatches to objects that implement `reduce`', function() {
    var obj = {x: [1, 2, 3], reduce: function() { return 'override'; }};
    eq(R.into([], R.map(add(1)), obj), 'override');
    eq(R.into([], R.filter(isOdd), obj), 'override');
  });

  it('allows custom transformer', function() {
    var intoSum = R.into(addXf);
    var add2 = R.map(add(2));
    var result = intoSum(add2);
    eq(result([1, 2, 3, 4]), 18);
  });

});
