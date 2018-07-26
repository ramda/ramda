var assert = require('assert');

var R = require('../source');
var eq = require('./shared/eq');


describe('init', function() {

  it('returns all but the last element of an ordered collection', function() {
    eq(R.init([1, 2, 3]), [1, 2]);
    eq(R.init([2, 3]), [2]);
    eq(R.init([3]), []);
    eq(R.init([]), []);

    eq(R.init('abc'), 'ab');
    eq(R.init('bc'), 'b');
    eq(R.init('c'), '');
    eq(R.init(''), '');
  });

  it('throws if applied to null or undefined', function() {
    assert.throws(function() { R.init(null); }, TypeError);
    assert.throws(function() { R.init(undefined); }, TypeError);
  });

  it('handles array-like object', function() {
    var args = (function() { return arguments; }(1, 2, 3, 4, 5));
    eq(R.init(args), [1, 2, 3, 4]);
  });

});
