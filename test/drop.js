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

  it('never returns the input array', function() {
    var xs = [1, 2, 3];

    assert.notStrictEqual(R.drop(0, xs), xs);
    assert.notStrictEqual(R.drop(-1, xs), xs);
  });

  it('can operate on strings', function() {
    assert.strictEqual(R.drop(3, 'Ramda'), 'da');
    assert.strictEqual(R.drop(4, 'Ramda'), 'a');
    assert.strictEqual(R.drop(5, 'Ramda'), '');
    assert.strictEqual(R.drop(6, 'Ramda'), '');
  });

});
