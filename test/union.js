var assert = require('assert');

var R = require('..');


describe('union', function() {
  var M = [1, 2, 3, 4];
  var N = [3, 4, 5, 6];
  it('combines two lists into the set of all their elements', function() {
    assert.deepEqual(R.union(M, N), [1, 2, 3, 4, 5, 6]);
  });

  it('is curried', function() {
    assert.strictEqual(typeof R.union(M), 'function');
    assert.deepEqual(R.union(M)(N), [1, 2, 3, 4, 5, 6]);
  });

  it('has R.equals semantics', function() {
    function Just(x) { this.value = x; }
    Just.prototype.equals = function(x) {
      return x instanceof Just && R.equals(x.value, this.value);
    };

    assert.strictEqual(R.union([0], [-0]).length, 2);
    assert.strictEqual(R.union([-0], [0]).length, 2);
    assert.strictEqual(R.union([NaN], [NaN]).length, 1);
    assert.strictEqual(R.union([new Just([42])], [new Just([42])]).length, 1);
  });
});
