var assert = require('assert');

var R = require('..');


describe('strSlice', function() {

  it('returns a slice of the given string', function() {
    assert.strictEqual(R.strSlice(0, 0, 'abc'), '');
    assert.strictEqual(R.strSlice(0, 1, 'abc'), 'a');
    assert.strictEqual(R.strSlice(0, 2, 'abc'), 'ab');
    assert.strictEqual(R.strSlice(0, 3, 'abc'), 'abc');
    assert.strictEqual(R.strSlice(0, 4, 'abc'), 'abc');
    assert.strictEqual(R.strSlice(2, 1, 'abc'), '');
    assert.strictEqual(R.strSlice(2, 2, 'abc'), '');
    assert.strictEqual(R.strSlice(2, 3, 'abc'), 'c');
    assert.strictEqual(R.strSlice(2, 4, 'abc'), 'c');
  });

  it('accepts a negative start offset', function() {
    assert.strictEqual(R.strSlice(-1, 9, 'abc'), 'c');
    assert.strictEqual(R.strSlice(-2, 9, 'abc'), 'bc');
    assert.strictEqual(R.strSlice(-3, 9, 'abc'), 'abc');
    assert.strictEqual(R.strSlice(-4, 9, 'abc'), 'abc');
  });

  it('accepts a negative end offset', function() {
    assert.strictEqual(R.strSlice(0, -1, 'abc'), 'ab');
    assert.strictEqual(R.strSlice(0, -2, 'abc'), 'a');
    assert.strictEqual(R.strSlice(0, -3, 'abc'), '');
    assert.strictEqual(R.strSlice(0, -4, 'abc'), '');
    assert.strictEqual(R.strSlice(-2, -1, 'abc'), 'b');
    assert.strictEqual(R.strSlice(-2, -2, 'abc'), '');
    assert.strictEqual(R.strSlice(-2, -3, 'abc'), '');
  });

});
