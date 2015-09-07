var assert = require('assert');

var R = require('..');


describe('and', function() {
  it('compares two values with js &&', function() {
    assert.strictEqual(R.and(true, true), true);
    assert.strictEqual(R.and(true, false), false);
    assert.strictEqual(R.and(false, true), false);
    assert.strictEqual(R.and(false, false), false);
  });

  it('is curried', function() {
    var halfTruth = R.and(true);
    assert.strictEqual(halfTruth(false), false);
    assert.strictEqual(halfTruth(true), true);
  });
});
