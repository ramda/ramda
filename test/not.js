var assert = require('assert');

var R = require('..');


describe('not', function() {
  it('reverses argument', function() {
    assert.strictEqual(R.not(false), true);
    assert.strictEqual(R.not(1), false);
    assert.strictEqual(R.not(''), true);
  });
});
