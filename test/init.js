var assert = require('assert');

var R = require('..');


describe('init', function() {

  it('returns all but the last element of an ordered collection', function() {
    assert.deepEqual(R.init([1, 2, 3]), [1, 2]);
    assert.deepEqual(R.init([2, 3]), [2]);
    assert.deepEqual(R.init([3]), []);
    assert.deepEqual(R.init([]), []);

    assert.strictEqual(R.init('abc'), 'ab');
    assert.strictEqual(R.init('bc'), 'b');
    assert.strictEqual(R.init('c'), '');
    assert.strictEqual(R.init(''), '');
  });

  it('throws if applied to null or undefined', function() {
    assert.throws(function() { R.init(null); }, TypeError);
    assert.throws(function() { R.init(undefined); }, TypeError);
  });

  it('handles array-like object', function() {
    var args = (function() { return arguments; }(1, 2, 3, 4, 5));
    assert.deepEqual(R.init(args), [1, 2, 3, 4]);
  });

});
