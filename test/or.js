var assert = require('assert');

var R = require('..');


describe('or', function() {
  it('compares two values with js &&', function() {
    assert.strictEqual(R.or(true, true), true);
    assert.strictEqual(R.or(true, false), true);
    assert.strictEqual(R.or(false, true), true);
    assert.strictEqual(R.or(false, false), false);
  });

  it('is curried', function() {
    assert.strictEqual(R.or(false)(false), false);
    assert.strictEqual(R.or(false)(true), true);
  });
});
