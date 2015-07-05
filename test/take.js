var assert = require('assert');

var R = require('..');


describe('take', function() {
  it('takes only the first `n` elements from a list', function() {
    assert.deepEqual(R.take(3, ['a', 'b', 'c', 'd', 'e', 'f', 'g']), ['a', 'b', 'c']);
  });

  it('returns only as many as the array can provide', function() {
    assert.deepEqual(R.take(3, [1, 2]), [1, 2]);
    assert.deepEqual(R.take(3, []), []);
  });

  it('returns an equivalent list if `n` is < 0', function() {
    assert.deepEqual(R.take(-1, [1, 2, 3]), [1, 2, 3]);
    assert.deepEqual(R.take(-Infinity, [1, 2, 3]), [1, 2, 3]);
  });

  it('never returns the input array', function() {
    var xs = [1, 2, 3];

    assert.notStrictEqual(R.take(3, xs), xs);
    assert.notStrictEqual(R.take(Infinity, xs), xs);
    assert.notStrictEqual(R.take(-1, xs), xs);
  });

  it('can operate on strings', function() {
    assert.strictEqual(R.take(3, 'Ramda'), 'Ram');
  });

  it('is curried', function() {
    var take3 = R.take(3);
    assert.deepEqual(take3(['a', 'b', 'c', 'd', 'e', 'f', 'g']), ['a', 'b', 'c']);
    assert.deepEqual(take3(['w', 'x', 'y', 'z']), ['w', 'x', 'y']);
  });
});
