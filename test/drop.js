var assert = require('assert');

var R = require('..');


describe('drop', function() {
  it('skips the first `n` elements from a list, returning the remainder', function() {
    assert.deepEqual(R.drop(3, ['a', 'b', 'c', 'd', 'e', 'f', 'g']), ['d', 'e', 'f', 'g']);
  });

  it('returns an empty array if `n` is too large', function() {
    assert.deepEqual(R.drop(20, ['a', 'b', 'c', 'd', 'e', 'f', 'g']), []);
  });

  it('returns an equivalent list if `n` is <= 0', function() {
    assert.deepEqual(R.drop(0, [1, 2, 3]), [1, 2, 3]);
    assert.deepEqual(R.drop(-1, [1, 2, 3]), [1, 2, 3]);
    assert.deepEqual(R.drop(-Infinity, [1, 2, 3]), [1, 2, 3]);
  });

  it('is curried', function() {
    var drop2 = R.drop(2);
    assert.deepEqual(drop2(['a', 'b', 'c', 'd', 'e']), ['c', 'd', 'e']);
    assert.deepEqual(drop2(['x', 'y', 'z']), ['z']);
  });
});
