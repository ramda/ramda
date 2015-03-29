var assert = require('assert');

var R = require('..');

describe('update', function() {
  it('updates the value at the given index of the supplied array', function() {
    assert.deepEqual(R.update(2, 4, [0, 1, 2, 3]), [0, 1, 4, 3]);
  });

  it('offsets negative indexes from the end of the array', function() {
    assert.deepEqual(R.update(-3, 4, [0, 1, 2, 3]), [0, 4, 2, 3]);
  });

  it('returns the original array if the supplied index is out of bounds', function() {
    var list = [0, 1, 2, 3];
    assert.deepEqual(R.update(4, 4, list), list);
    assert.deepEqual(R.update(-5, 4, list), list);
  });

  it('does not mutate the original array', function() {
    var list = [0, 1, 2, 3];
    assert.deepEqual(R.update(2, 4, list), [0, 1, 4, 3]);
    assert.deepEqual(list, [0, 1, 2, 3]);
  });

  it('curries the arguments', function() {
    assert.deepEqual(R.update(2)(4)([0, 1, 2, 3]), [0, 1, 4, 3]);
  });

  it('accepts an array-like object', function() {
    function args() {
      return arguments;
    }
    assert.deepEqual(R.update(2, 4, args(0, 1, 2, 3)), [0, 1, 4, 3]);
  });
});
