var assert = require('assert');

var R = require('..');


describe('length', function() {
  it('returns the length of a list', function() {
    assert.strictEqual(R.length([]), 0);
    assert.strictEqual(R.length(['a', 'b', 'c', 'd']), 4);
  });

  it('returns the length of a string', function() {
    assert.strictEqual(R.length(''), 0);
    assert.strictEqual(R.length('xyz'), 3);
  });

  it('returns the length of a function', function() {
    assert.strictEqual(R.length(function() {}), 0);
    assert.strictEqual(R.length(function(x, y, z) { return z; }), 3);
  });

  it('returns the length of an arguments object', function() {
    assert.strictEqual(R.length((function() { return arguments; }())), 0);
    assert.strictEqual(R.length((function() { return arguments; }('x', 'y', 'z'))), 3);
  });

  it('returns NaN for value of unexpected type', function() {
    assert.strictEqual(R.eqNaN(R.length(0)), true);
    assert.strictEqual(R.eqNaN(R.length({})), true);
    assert.strictEqual(R.eqNaN(R.length(null)), true);
    assert.strictEqual(R.eqNaN(R.length(undefined)), true);
  });

  it('returns NaN for length property of unexpected type', function() {
    assert.strictEqual(R.eqNaN(R.length({length: ''})), true);
    assert.strictEqual(R.eqNaN(R.length({length: '1.23'})), true);
    assert.strictEqual(R.eqNaN(R.length({length: null})), true);
    assert.strictEqual(R.eqNaN(R.length({length: undefined})), true);
    assert.strictEqual(R.eqNaN(R.length({})), true);
  });
});
