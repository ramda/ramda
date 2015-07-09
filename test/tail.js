var assert = require('assert');

var R = require('..');


describe('tail', function() {

  it('returns the tail of an ordered collection', function() {
    assert.deepEqual(R.tail([1, 2, 3]), [2, 3]);
    assert.deepEqual(R.tail([2, 3]), [3]);
    assert.deepEqual(R.tail([3]), []);
    assert.deepEqual(R.tail([]), []);

    assert.strictEqual(R.tail('abc'), 'bc');
    assert.strictEqual(R.tail('bc'), 'c');
    assert.strictEqual(R.tail('c'), '');
    assert.strictEqual(R.tail(''), '');
  });

  it('throws if applied to null or undefined', function() {
    assert.throws(function() { R.tail(null); }, TypeError);
    assert.throws(function() { R.tail(undefined); }, TypeError);
  });

});
