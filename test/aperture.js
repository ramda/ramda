var assert = require('assert');

var R = require('..');


describe('aperture', function() {
  var sevenLs = [1, 2, 3, 4, 5, 6, 7];
  it('creates a list of n-tuples from a list', function() {
    assert.deepEqual(R.aperture(1, sevenLs), [[1], [2], [3], [4], [5], [6], [7]]);
    assert.deepEqual(R.aperture(2, sevenLs), [[1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7]]);
    assert.deepEqual(R.aperture(3, sevenLs), [[1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 6], [5, 6, 7]]);
    assert.deepEqual(R.aperture(4, [1, 2, 3, 4]), [[1, 2, 3, 4]]);
  });

  it('returns an empty list when `n` > `list.length`', function() {
    assert.deepEqual(R.aperture(6, [1, 2, 3]), []);
    assert.deepEqual(R.aperture(1, []), []);
  });

  it('is curried', function() {
    var pairwise = R.aperture(2);
    assert.deepEqual(pairwise(sevenLs), [[1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7]]);
  });
});
