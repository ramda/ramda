var assert = require('assert');

var R = require('..');


describe('uniqBy', function() {

  it('returns a set from any array based on predicate', function() {
    assert.deepEqual(R.uniqBy(Math.abs, [-2, -1, 0, 1, 2]), [-2, -1, 0]);
  });

  it('keeps elements from the left', function() {
    assert.deepEqual(R.uniqBy(Math.abs, [-1, 2, 4, 3, 1, 3]), [-1, 2, 4, 3]);
  });

  it('returns an empty array for an empty array', function() {
    assert.deepEqual(R.uniqBy(R.identity, []), []);
  });

  it('has R.equals semantics', function() {
    function Just(x) {
      this.value = x;
    }
    Just.prototype.equals = function(x) {
      return x instanceof Just && R.equals(x.value, this.value);
    };
    assert.strictEqual(R.uniqBy(R.identity, [-0, 0]).length, 2);
    assert.strictEqual(R.uniqBy(R.identity, [NaN, NaN]).length, 1);
    assert.strictEqual(R.uniqBy(R.identity, [new Just([1, 2, 3]), new Just([1, 2, 3])]).length, 1);
  });

});
