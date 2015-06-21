var assert = require('assert');

var R = require('..');


describe('splitEvery', function() {
  it('splits a list into n item lists according to argument n', function() {
    var emptyList = [];
    var oneList = [5];
    var oddlist = [2, 5, 2, 1, 0, -5, 8];
    var evenList = [4, 2, 9, 7];

    assert.deepEqual(R.splitEvery(2, emptyList), []);
    assert.deepEqual(R.splitEvery(2, oneList), [[5]]);
    assert.deepEqual(R.splitEvery(2, oddlist), [[2, 5], [2, 1], [0, -5], [8]]);
    assert.deepEqual(R.splitEvery(4, oddlist), [[2, 5, 2, 1], [0, -5, 8]]);
    assert.deepEqual(R.splitEvery(2, evenList), [[4, 2], [9, 7]]);
    assert.deepEqual(R.splitEvery(4, evenList), [[4, 2, 9, 7]]);
    assert.deepEqual(R.splitEvery(6, evenList), [[4, 2, 9, 7]]);
  });

  it('is curried', function() {
    var splitEvery2 = R.splitEvery(2);
    assert.deepEqual(splitEvery2([5]), [[5]]);
    assert.deepEqual(splitEvery2([2, 5, 2, 1, 0, -5, 8]), [[2, 5], [2, 1], [0, -5], [8]]);
  });
});
