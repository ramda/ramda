/* jshint -W053 */

var assert = require('assert');

var R = require('..');


var add3 = R.curry(function add3(a, b, c) {
  return a + b + c;
});
var add4 = R.curry(function add4(a, b, c, d) {
  return a + b + c + d;
});
var add5 = R.curry(function add5(a, b, c, d, e) {
  return a + b + c + d + e;
});
var madd3 = R.lift(add3);
var madd4 = R.lift(add4);
var madd5 = R.lift(add5);


describe('lift', function() {

  it('returns a function if called with just a function', function() {
    assert.strictEqual(typeof R.lift(R.add), 'function');
  });

  it('produces a cross-product of array values', function() {
    assert.deepEqual(madd3([1, 2, 3], [1, 2], [1, 2, 3]), [3, 4, 5, 4, 5, 6, 4, 5, 6, 5, 6, 7, 5, 6, 7, 6, 7, 8]);
    assert.deepEqual(madd3([1], [2], [3]), [6]);
    assert.deepEqual(madd3([1, 2], [3, 4], [5, 6]), [9, 10, 10, 11, 10, 11, 11, 12]);
  });

  it('can lift functions of any arity', function() {
    assert.deepEqual(madd3([1, 10], [2], [3]), [6, 15]);
    assert.deepEqual(madd4([1, 10], [2], [3], [40]), [46, 55]);
    assert.deepEqual(madd5([1, 10], [2], [3], [40], [500, 1000]), [546, 1046, 555, 1055]);
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

    assert.strictEqual(R.toString(R.lift(R.add)(Identity(3), Identity(5))), 'Identity(8)');
  });

});
