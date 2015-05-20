var assert = require('assert');

var R = require('..');


describe('uniq', function() {
  it('returns a set from any array (i.e. purges duplicate elements)', function() {
    var list = [1, 2, 3, 1, 2, 3, 1, 2, 3];
    assert.deepEqual(R.uniq(list), [1, 2, 3]);
  });

  it('keeps elements from the left', function() {
    assert.deepEqual(R.uniq([1, 2, 3, 4, 1]), [1, 2, 3, 4]);
  });

  it('returns an empty array for an empty array', function() {
    assert.deepEqual(R.uniq([]), []);
  });

  it('has R.equals semantics', function() {
    function Just(x) { this.value = x; }
    Just.prototype.equals = function(x) {
      return x instanceof Just && R.equals(x.value, this.value);
    };

    assert.strictEqual(R.uniq([0, -0]).length, 2);
    assert.strictEqual(R.uniq([NaN, NaN]).length, 1);
    assert.strictEqual(R.uniq([new Just([42]), new Just([42])]).length, 1);
  });
});
