var assert = require('assert');

var R = require('..');


describe('difference', function() {
  var M = [1, 2, 3, 4];
  var M2 = [1, 2, 3, 4, 1, 2, 3, 4];
  var N = [3, 4, 5, 6];
  var N2 = [3, 3, 4, 4, 5, 5, 6, 6];
  var Z = [3, 4, 5, 6, 10];
  var Z2 = [1, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 8];
  it('finds the set of all elements in the first list not contained in the second', function() {
    assert.deepEqual(R.difference(M, N), [1, 2]);
  });

  it('does not allow duplicates in the output even if the input lists had duplicates', function() {
    assert.deepEqual(R.difference(M2, N2), [1, 2]);
  });

  it('has R.equals semantics', function() {
    function Just(x) { this.value = x; }
    Just.prototype.equals = function(x) {
      return x instanceof Just && R.equals(x.value, this.value);
    };

    assert.strictEqual(R.difference([0], [-0]).length, 1);
    assert.strictEqual(R.difference([-0], [0]).length, 1);
    assert.strictEqual(R.difference([NaN], [NaN]).length, 0);
    assert.strictEqual(R.difference([new Just([42])], [new Just([42])]).length, 0);
  });

  it('works for arrays of different lengths', function() {
    assert.deepEqual(R.difference(Z, Z2), [10]);
    assert.deepEqual(R.difference(Z2, Z), [1, 2, 7, 8]);
  });

  it('will not create a "sparse" array', function() {
    assert.strictEqual(R.difference(M2, [3]).length, 3);
  });

  it('returns an empty array if there are no different elements', function() {
    assert.deepEqual(R.difference(M2, M), []);
    assert.deepEqual(R.difference(M, M2), []);
    assert.deepEqual(R.difference([], M2), []);
  });

  it('is curried', function() {
    assert.strictEqual(typeof R.difference([1, 2, 3]), 'function');
    assert.deepEqual(R.difference([1, 2, 3])([1, 3]), [2]);
  });
});
