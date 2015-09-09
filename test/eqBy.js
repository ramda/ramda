var assert = require('assert');

var R = require('..');


describe('eqBy', function() {

  it('determines whether two values map to the same value in the codomain', function() {
    assert.strictEqual(R.eqBy(Math.abs, 5, 5), true);
    assert.strictEqual(R.eqBy(Math.abs, 5, -5), true);
    assert.strictEqual(R.eqBy(Math.abs, -5, 5), true);
    assert.strictEqual(R.eqBy(Math.abs, -5, -5), true);
    assert.strictEqual(R.eqBy(Math.abs, 42, 99), false);
  });

  it('has R.equals semantics', function() {
    function Just(x) { this.value = x; }
    Just.prototype.equals = function(x) {
      return x instanceof Just && R.equals(x.value, this.value);
    };

    assert.strictEqual(R.eqBy(R.identity, 0, -0), false);
    assert.strictEqual(R.eqBy(R.identity, -0, 0), false);
    assert.strictEqual(R.eqBy(R.identity, NaN, NaN), true);
    assert.strictEqual(R.eqBy(R.identity, new Just([42]), new Just([42])), true);
  });

});
