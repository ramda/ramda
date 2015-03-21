var assert = require('assert');

var R = require('..');


describe('times', function() {
  it('takes a map func', function() {
    assert.deepEqual(R.times(R.identity, 5), [0, 1, 2, 3, 4]);
    assert.deepEqual(R.times(function(x) {
      return x * 2;
    }, 5), [0, 2, 4, 6, 8]);
  });

  it('is curried', function() {
    var mapid = R.times(R.identity);
    assert.deepEqual(mapid(5), [0, 1, 2, 3, 4]);
  });

  it('throws if second argument is not a valid array length', function() {
    assert.throws(function() { R.times(3)('cheers!'); }, RangeError);
    assert.throws(function() { R.times(R.identity, -1); }, RangeError);
  });
});
