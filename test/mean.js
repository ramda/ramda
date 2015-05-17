var assert = require('assert');

var R = require('..');


describe('mean', function() {

  it('returns mean of a nonempty list', function() {
    assert.strictEqual(R.mean([2]), 2);
    assert.strictEqual(R.mean([2, 7]), 4.5);
    assert.strictEqual(R.mean([2, 7, 9]), 6);
    assert.strictEqual(R.mean([2, 7, 9, 10]), 7);
  });

  it('returns NaN for an empty list', function() {
    assert.strictEqual(R.identical(NaN, R.mean([])), true);
  });

  it('handles array-like object', function() {
    assert.strictEqual(R.mean((function() { return arguments; }(1, 2, 3))), 2);
  });

});
