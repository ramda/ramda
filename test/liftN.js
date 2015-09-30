/* jshint -W053 */

var assert = require('assert');

var R = require('..');
var Maybe = require('./shared/Maybe');


var addN = function() {
  return R.reduce(function(a, b) { return a + b; }, 0, arguments);
};
var add3 = R.curry(function add3(a, b, c) {
  return a + b + c;
});


describe('liftN', function() {

  var addN3 = R.liftN(3, addN);
  var addN4 = R.liftN(4, addN);
  var addN5 = R.liftN(5, addN);

  it('returns a function', function() {
    assert.strictEqual(typeof R.liftN(3, add3), 'function');
  });

  it('limits a variadic function to the specified arity', function() {
    assert.deepEqual(addN3([1, 10], [2], [3]), [6, 15]);
  });

  it('can lift functions of any arity', function() {
    assert.deepEqual(addN3([1, 10], [2], [3]), [6, 15]);
    assert.deepEqual(addN4([1, 10], [2], [3], [40]), [46, 55]);
    assert.deepEqual(addN5([1, 10], [2], [3], [40], [500, 1000]), [546, 1046, 555, 1055]);
  });

  it('is curried', function() {
    var f4 = R.liftN(4);
    assert.strictEqual(typeof f4, 'function');
    assert.deepEqual(f4(addN)([1], [2], [3], [4, 5]), [10, 11]);
  });

  it('works with other functors such as "Maybe"', function() {
    var addM = R.liftN(2, R.add);
    assert.deepEqual(addM(Maybe(3), Maybe(5)), Maybe(8));
  });

  it('interprets [a] as a functor', function() {
    assert.deepEqual(addN3([1, 2, 3], [10, 20], [100, 200, 300]), [111, 211, 311, 121, 221, 321, 112, 212, 312, 122, 222, 322, 113, 213, 313, 123, 223, 323]);
    assert.deepEqual(addN3([1], [2], [3]), [6]);
    assert.deepEqual(addN3([1, 2], [10, 20], [100, 200]), [111, 211, 121, 221, 112, 212, 122, 222]);
  });

  it('interprets ((->) r) as a functor', function() {
    var convergedOnInt = addN3(R.add(2), R.multiply(3), R.subtract(4));
    var convergedOnBool = R.liftN(2, R.and)(R.gt(R.__, 0), R.lt(R.__, 3));
    assert.strictEqual(typeof convergedOnInt, 'function');
    assert.strictEqual(typeof convergedOnBool, 'function');
    assert.strictEqual(convergedOnInt(10), (10 + 2) + (10 * 3) + (4 - 10));
    // jscs:disable disallowYodaConditions
    assert.strictEqual(convergedOnBool(0), (0 > 0) && (0 < 3));
    assert.strictEqual(convergedOnBool(1), (1 > 0) && (1 < 3));
    assert.strictEqual(convergedOnBool(2), (2 > 0) && (2 < 3));
    assert.strictEqual(convergedOnBool(3), (3 > 0) && (3 < 3));
    // jscs:enable disallowYodaConditions
  });
});
