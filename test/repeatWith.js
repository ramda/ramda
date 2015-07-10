var assert = require('assert');

var R = require('..');


describe('repeatWith', function() {
  it('takes a map func', function() {
    assert.deepEqual(R.repeatWith(R.identity, 5), [0, 1, 2, 3, 4]);
    assert.deepEqual(R.repeatWith(function(x) {
      return x * 2;
    }, 5), [0, 2, 4, 6, 8]);
  });

  it('is curried', function() {
    var mapid = R.repeatWith(R.identity);
    assert.deepEqual(mapid(5), [0, 1, 2, 3, 4]);
  });

  it('throws if second argument is not a valid array length', function() {
    assert.throws(function() { R.repeatWith(3)('cheers!'); }, RangeError);
    assert.throws(function() { R.repeatWith(R.identity, -1); }, RangeError);
  });
});
