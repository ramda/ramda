var assert = require('assert');

var R = require('..');


describe('uniqBy', function() {

  var objs = [
    {i: 1, v: 1}, {i: 2, v: 2}, {i: 3, v: 3}, {i: 4, v: 4}, {i: 5, v: 5},
    {i: 6, v: 6}, {i: 7, v: 7}, {i: 8, v: 8}, {i: 9, v: 9}, {i: 10, v: 10}
  ];

  var objs2 = [
    {i: 1, v: 1}, {i: 2, v: 2}, {i: 2, v: 3}, {i: 4, v: 4}, {i: 5, v: 5},
    {i: 6, v: 6}, {i: 6, v: 7}, {i: 6, v: 8}, {i: 9, v: 9}, {i: 5, v: 10}
  ];

  it('returns a set from any array (i.e. purges duplicate elements) based on predicate', function() {
    assert.deepEqual(R.uniqBy(R.prop('i'), objs), objs);
    assert.deepEqual(R.uniqBy(R.prop('i'), objs2), [{i: 1, v: 1}, {i: 2, v: 2}, {i: 4, v: 4}, {i: 5, v: 5}, {i: 6, v: 6}, {i: 9, v: 9}]);
  });

  it('keeps elements from the left', function() {
    assert.deepEqual(R.uniqBy(Math.abs, [-1, 2, 4, 3, 1, 3]), [-1, 2, 4, 3]);
  });

  it('returns an empty array for an empty array', function() {
    assert.deepEqual(R.uniqBy(R.prop('i'), []), []);
  });

  it('has R.equals semantics', function() {
    function Just(x) {
      this.value = x;
    }
    Just.prototype.equals = function(x) {
      return x instanceof Just && R.equals(x.value, this.value);
    };
    assert.strictEqual(R.uniqBy(Math.abs, [-1, 1]).length, 1);
    assert.strictEqual(R.uniqBy(R.identity, [new Just([-1]), new Just([-1])]).length, 1);
    assert.strictEqual(R.uniqBy(R.identity, [-0, 0]).length, 2);
    assert.strictEqual(R.uniqBy(R.identity, [NaN, NaN]).length, 1);
  });
});
