var assert = require('assert');

var R = require('..');
var eq = require('./shared/eq');


describe('splitEvery', function() {

  it('splits a collection into slices of the specified length', function() {
    eq(R.splitEvery(1, [1, 2, 3, 4]), [[1], [2], [3], [4]]);
    eq(R.splitEvery(2, [1, 2, 3, 4]), [[1, 2], [3, 4]]);
    eq(R.splitEvery(3, [1, 2, 3, 4]), [[1, 2, 3], [4]]);
    eq(R.splitEvery(4, [1, 2, 3, 4]), [[1, 2, 3, 4]]);
    eq(R.splitEvery(5, [1, 2, 3, 4]), [[1, 2, 3, 4]]);
    eq(R.splitEvery(3, []), []);
    eq(R.splitEvery(1, 'abcd'), ['a', 'b', 'c', 'd']);
    eq(R.splitEvery(2, 'abcd'), ['ab', 'cd']);
    eq(R.splitEvery(3, 'abcd'), ['abc', 'd']);
    eq(R.splitEvery(4, 'abcd'), ['abcd']);
    eq(R.splitEvery(5, 'abcd'), ['abcd']);
    eq(R.splitEvery(3, ''), []);
  });

  it('throws if first argument is not positive', function() {
    var test = function(err) {
      return err.constructor === Error &&
             err.message === 'First argument to splitEvery must be a positive integer';
    };
    assert.throws(function() { R.splitEvery(0, []); }, test);
    assert.throws(function() { R.splitEvery(0, ''); }, test);
    assert.throws(function() { R.splitEvery(-1, []); }, test);
    assert.throws(function() { R.splitEvery(-1, ''); }, test);
  });

  it('works with infinite list', function() {
    const natural = R.xrange(1, 1, Infinity);
    eq(R.take(3, R.splitEvery(2, natural)), [[1, 2], [3, 4], [5, 6]]);
  });

  it('works with generators of limited length', function() {
    const nums = R.xrange(1, 1, 6);
    eq(R.take(3, R.splitEvery(3, nums)), [[1, 2, 3], [4, 5]]);
  });

});
