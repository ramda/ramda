var assert = require('assert');

var R = require('..');


describe('isEmpty', function() {

  it('returns false for null', function() {
    assert.strictEqual(R.isEmpty(null), false);
  });

  it('returns false for undefined', function() {
    assert.strictEqual(R.isEmpty(undefined), false);
  });

  it('returns true for empty string', function() {
    assert.strictEqual(R.isEmpty(''), true);
    assert.strictEqual(R.isEmpty(' '), false);
  });

  it('returns true for empty array', function() {
    assert.strictEqual(R.isEmpty([]), true);
    assert.strictEqual(R.isEmpty([[]]), false);
  });

  it('returns true for empty object', function() {
    assert.strictEqual(R.isEmpty({}), true);
    assert.strictEqual(R.isEmpty({x: 0}), false);
  });

  it('returns true for empty arguments object', function() {
    assert.strictEqual(R.isEmpty((function() { return arguments; }())), true);
    assert.strictEqual(R.isEmpty((function() { return arguments; }(0))), false);
  });

  it('returns false for every other value', function() {
    assert.strictEqual(R.isEmpty(0), false);
    assert.strictEqual(R.isEmpty(NaN), false);
    assert.strictEqual(R.isEmpty(['']), false);
  });

});
