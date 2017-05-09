var assert = require('assert');

var R = require('..');


describe('batch', function() {
  it('subdivides a list', function() {
    assert.deepEqual(R.batch(3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]), [[1, 2, 3], [4, 5, 6], [7, 8, 9], [0]]);
    assert.deepEqual(R.batch(3, [1, 2, 3]), [[1, 2, 3]]);
    assert.deepEqual(R.batch(2, [1, 2, 3]), [[1, 2], [3]]);
    assert.deepEqual(R.batch(1, [1, 2, 3]), [[1], [2], [3]]);
    assert.deepEqual(R.batch(0, [1, 2, 3]), [[1, 2, 3]]);
  });

  it('returns an empty list for an empty list', function() {
    assert.deepEqual(R.batch(0, []), []);
    assert.deepEqual(R.batch(3, []), []);
  });

  it('dispatches', function() {
    var obj = {batch: function() { return 'override'; }};
    assert.strictEqual(R.batch(2, obj), 'override');
  });

  it('is curried', function() {
    assert.strictEqual(typeof R.batch(2), 'function');
    assert.deepEqual(R.batch(2)([1, 2, 3]), [[1, 2], [3]]);
  });
});
