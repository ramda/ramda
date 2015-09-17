var assert = require('assert');

var R = require('..');


describe('isEmpty', function() {

  it('returns true for empty string', function() {
    assert.strictEqual(R.isEmpty(''), true);
  });

  it('returns false for a non empty string', function() {
    assert.strictEqual(R.isEmpty('f'), false);
  });

  it('returns true for empty array', function() {
    assert.strictEqual(R.isEmpty([]), true);
  });

  it('returns false for a non empty array', function() {
    assert.strictEqual(R.isEmpty(['']), false);
  });

  it('returns true for empty arguments object', function() {
    assert.strictEqual(R.isEmpty((function() { return arguments; }())), true);
  });

});
