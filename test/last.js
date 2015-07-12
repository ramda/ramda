var assert = require('assert');

var R = require('..');


describe('last', function() {

  it('returns the first element of an ordered collection', function() {
    assert.strictEqual(R.last([1, 2, 3]), 3);
    assert.strictEqual(R.last([1, 2]), 2);
    assert.strictEqual(R.last([1]), 1);
    assert.strictEqual(R.last([]), undefined);

    assert.strictEqual(R.last('abc'), 'c');
    assert.strictEqual(R.last('ab'), 'b');
    assert.strictEqual(R.last('a'), 'a');
    assert.strictEqual(R.last(''), '');
  });

  it('throws if applied to null or undefined', function() {
    assert.throws(function() { R.last(null); }, TypeError);
    assert.throws(function() { R.last(undefined); }, TypeError);
  });

});
