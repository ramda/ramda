var assert = require('assert');

var R = require('..');


describe('intersection', function() {
  var M = [1, 2, 3, 4];
  var M2 = [1, 2, 3, 4, 1, 2, 3, 4];
  var N = [3, 4, 5, 6];
  var N2 = [3, 3, 4, 4, 5, 5, 6, 6];
  it('combines two lists into the set of common elements', function() {
    assert.deepEqual(R.intersection(M, N), [3, 4]);
  });

  it('does not allow duplicates in the output even if the input lists had duplicates', function() {
    assert.deepEqual(R.intersection(M2, N2), [3, 4]);
  });

  it('has R.equals semantics', function() {
    function Just(x) { this.value = x; }
    Just.prototype.equals = function(x) {
      return x instanceof Just && R.equals(x.value, this.value);
    };

    assert.strictEqual(R.intersection([0], [-0]).length, 0);
    assert.strictEqual(R.intersection([-0], [0]).length, 0);
    assert.strictEqual(R.intersection([NaN], [NaN]).length, 1);
    assert.strictEqual(R.intersection([new Just([42])], [new Just([42])]).length, 1);
  });
});
