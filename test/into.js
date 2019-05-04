var assert = require('assert');

var R = require('../source');
var eq = require('./shared/eq');
var throwReduceTypeError = require('./helpers/throwReduceTypeError');
var unorderedErrorMessage = 'unordered input passed for ordered transducer';


describe('into', function() {
  var add = R.add;
  var isOdd = function(b) {return b % 2 === 1;};
  var isTriple = function(b) {return b % 3 === 0;};
  var mapInc = R.map(R.inc);
  var takeOne = R.take(1);
  var mapDec = R.map(R.dec);
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

  it('transduces from arrays into objects', function() {
    eq(R.into({}, R.identity, [['a', 1], ['b', 2]]), {a: 1, b: 2});
    eq(R.into({}, R.identity, [{a: 1}, {b: 2, c: 3}]), {a: 1, b: 2, c: 3});
  });

  it('transduces from objects into objects using simple commutative transducers', function() {
    eq(R.into({}, R.map(add(2)), {a: 1, b: 2, c: 3}), {a: 3, b: 4, c: 5});
    eq(R.into({}, R.map(add(2)), {}), {});
    eq(R.into({}, R.filter(isOdd), {a: 1, b: 2, c: 3}), {a: 1, c: 3});
  });

  it('transduces from objects into objects using complex commutative transducers', function() {
    eq(R.into({}, R.compose(mapInc, mapDec), {a: 1, b: 2}), {a: 1, b: 2});
    eq(R.into({}, R.compose(mapInc, R.filter(isOdd)), {a: 1, b: 2}), {b: 3});
    eq(R.into({}, R.compose(R.filter(isOdd), mapInc), {a: 1, b: 2}), {a: 2});
    eq(R.into({}, R.compose(R.filter(isOdd), R.filter(isTriple)), {a: 1, b: 2, c: 3}), {c: 3});
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

  it('throws if input is an object and function is a composition with some no commutative transducer', function() {
    assert.throws(function() {R.into({}, R.compose(mapInc, takeOne), {a: 1, b: 2});}, throwReduceTypeError(unorderedErrorMessage));
    assert.throws(function() {R.into({}, R.compose(takeOne, mapInc), {a: 1, b: 2});}, throwReduceTypeError(unorderedErrorMessage));
    assert.throws(function() {R.into([], R.compose(mapInc, takeOne), {a: 1, b: 2});}, throwReduceTypeError(unorderedErrorMessage));
    assert.throws(function() {R.into([], R.compose(takeOne, mapInc), {a: 1, b: 2});}, throwReduceTypeError(unorderedErrorMessage));
  });

});
