var assert = require('assert');

var R = require('..');


describe('median', function() {

  it('returns middle value of an odd-length list', function() {
    assert.strictEqual(R.median([2]), 2);
    assert.strictEqual(R.median([2, 9, 7]), 7);
  });

  it('returns mean of two middle values of a nonempty even-length list', function() {
    assert.strictEqual(R.median([7, 2]), 4.5);
    assert.strictEqual(R.median([7, 2, 10, 9]), 8);
  });

  it('returns NaN for an empty list', function() {
    assert.strictEqual(R.identical(NaN, R.median([])), true);
  });

  it('handles array-like object', function() {
    assert.strictEqual(R.median((function() { return arguments; }(1, 2, 3))), 2);
  });

});
