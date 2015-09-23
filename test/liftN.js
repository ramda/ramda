/* jshint -W053 */

var assert = require('assert');

var R = require('..');


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

  it('produces a cross-product of array values', function() {
    assert.deepEqual(addN3([1, 2, 3], [1, 2], [1, 2, 3]), [3, 4, 5, 4, 5, 6, 4, 5, 6, 5, 6, 7, 5, 6, 7, 6, 7, 8]);
    assert.deepEqual(addN3([1], [2], [3]), [6]);
    assert.deepEqual(addN3([1, 2], [3, 4], [5, 6]), [9, 10, 10, 11, 10, 11, 11, 12]);
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
    function Identity(x) {
      if (!(this instanceof Identity)) {
        return new Identity(x);
      }
      this.value = x;
    }
    Identity.prototype.ap = function(x) {
      return Identity(this.value(x.value));
    };
    Identity.prototype.map = function(f) {
      return Identity(f(this.value));
    };
    Identity.prototype.toString = function() {
      return 'Identity(' + R.toString(this.value) + ')';
    };

    assert.strictEqual(R.toString(R.liftN(2, R.add)(Identity(3), Identity(5))), 'Identity(8)');
  });
});
