var assert = require('assert');

var R = require('..');


describe('takeLast', function() {

  it('takes only the last `n` elements from a list', function() {
    assert.deepEqual(R.takeLast(3, ['a', 'b', 'c', 'd', 'e', 'f', 'g']), ['e', 'f', 'g']);
  });

  it('returns only as many as the array can provide', function() {
    assert.deepEqual(R.takeLast(3, [1, 2]), [1, 2]);
    assert.deepEqual(R.takeLast(3, []), []);
  });

  it('returns an equivalent list if `n` is < 0', function() {
    assert.deepEqual(R.takeLast(-1, [1, 2, 3]), [1, 2, 3]);
    assert.deepEqual(R.takeLast(-Infinity, [1, 2, 3]), [1, 2, 3]);
  });

  it('never returns the input array', function() {
    var xs = [1, 2, 3];

    assert.notStrictEqual(R.takeLast(3, xs), xs);
    assert.notStrictEqual(R.takeLast(Infinity, xs), xs);
    assert.notStrictEqual(R.takeLast(-1, xs), xs);
  });

  it('can operate on strings', function() {
    assert.strictEqual(R.takeLast(3, 'Ramda'), 'mda');
  });

  it('handles zero correctly (#1224)', function() {
    assert.deepEqual(R.takeLast(0, [1, 2, 3]), []);
  });

  it('is curried', function() {
    var takeLast3 = R.takeLast(3);
    assert.deepEqual(takeLast3(['a', 'b', 'c', 'd', 'e', 'f', 'g']), ['e', 'f', 'g']);
    assert.deepEqual(takeLast3(['w', 'x', 'y', 'z']), ['x', 'y', 'z']);
  });

});
