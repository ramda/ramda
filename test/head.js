var assert = require('assert');

var R = require('..');


describe('head', function() {

  it('returns the first element of an ordered collection', function() {
    assert.strictEqual(R.head([1, 2, 3]), 1);
    assert.strictEqual(R.head([2, 3]), 2);
    assert.strictEqual(R.head([3]), 3);
    assert.strictEqual(R.head([]), undefined);

    assert.strictEqual(R.head('abc'), 'a');
    assert.strictEqual(R.head('bc'), 'b');
    assert.strictEqual(R.head('c'), 'c');
    assert.strictEqual(R.head(''), '');
  });

  it('throws if applied to null or undefined', function() {
    assert.throws(function() { R.head(null); }, TypeError);
    assert.throws(function() { R.head(undefined); }, TypeError);
  });

});
