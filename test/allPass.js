var assert = require('assert');

var R = require('..');


describe('allPass', function() {
  var odd = function(n) { return n % 2 !== 0; };
  var lt20 = function(n) { return n < 20; };
  var gt5 = function(n) { return n > 5; };
  var plusEq = function(w, x, y, z) { return w + x === y + z; };

  it('reports whether all predicates are satisfied by a given value', function() {
    var ok = R.allPass([odd, lt20, gt5]);
    assert.strictEqual(ok(7), true);
    assert.strictEqual(ok(9), true);
    assert.strictEqual(ok(10), false);
    assert.strictEqual(ok(3), false);
    assert.strictEqual(ok(21), false);
  });

  it('returns true on empty predicate list', function() {
    assert.strictEqual(R.allPass([])(3), true);
  });

  it('returns a curried function whose arity matches that of the highest-arity predicate', function() {
    assert.strictEqual(R.allPass([odd, gt5, plusEq]).length, 4);
    assert.strictEqual(R.allPass([odd, gt5, plusEq])(9, 9, 9, 9), true);
    assert.strictEqual(R.allPass([odd, gt5, plusEq])(9)(9)(9)(9), true);
  });
});
