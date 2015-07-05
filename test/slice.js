var assert = require('assert');

var R = require('..');


describe('slice', function() {
  it('retrieves the proper sublist of a list', function() {
    var list = [8, 6, 7, 5, 3, 0, 9];
    assert.deepEqual(R.slice(2, 5, list), [7, 5, 3]);
  });
  it('handles array-like object', function() {
    var args = (function() { return arguments; }(1, 2, 3, 4, 5));
    assert.deepEqual(R.slice(1, 4, args), [2, 3, 4]);
  });
  it('can operate on strings', function() {
    assert.strictEqual(R.slice(0, 0, 'abc'), '');
    assert.strictEqual(R.slice(0, 1, 'abc'), 'a');
    assert.strictEqual(R.slice(0, 2, 'abc'), 'ab');
    assert.strictEqual(R.slice(0, 3, 'abc'), 'abc');
    assert.strictEqual(R.slice(0, 4, 'abc'), 'abc');
    assert.strictEqual(R.slice(1, 0, 'abc'), '');
    assert.strictEqual(R.slice(1, 1, 'abc'), '');
    assert.strictEqual(R.slice(1, 2, 'abc'), 'b');
    assert.strictEqual(R.slice(1, 3, 'abc'), 'bc');
    assert.strictEqual(R.slice(1, 4, 'abc'), 'bc');
    assert.strictEqual(R.slice(0, -4, 'abc'), '');
    assert.strictEqual(R.slice(0, -3, 'abc'), '');
    assert.strictEqual(R.slice(0, -2, 'abc'), 'a');
    assert.strictEqual(R.slice(0, -1, 'abc'), 'ab');
    assert.strictEqual(R.slice(0, -0, 'abc'), '');
    assert.strictEqual(R.slice(-2, -4, 'abc'), '');
    assert.strictEqual(R.slice(-2, -3, 'abc'), '');
    assert.strictEqual(R.slice(-2, -2, 'abc'), '');
    assert.strictEqual(R.slice(-2, -1, 'abc'), 'b');
    assert.strictEqual(R.slice(-2, -0, 'abc'), '');
  });
});
