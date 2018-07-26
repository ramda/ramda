var assert = require('assert');

var R = require('../source');
var eq = require('./shared/eq');


describe('tail', function() {

  it('returns the tail of an ordered collection', function() {
    eq(R.tail([1, 2, 3]), [2, 3]);
    eq(R.tail([2, 3]), [3]);
    eq(R.tail([3]), []);
    eq(R.tail([]), []);

    eq(R.tail('abc'), 'bc');
    eq(R.tail('bc'), 'c');
    eq(R.tail('c'), '');
    eq(R.tail(''), '');
  });

  it('throws if applied to null or undefined', function() {
    assert.throws(function() { R.tail(null); }, TypeError);
    assert.throws(function() { R.tail(undefined); }, TypeError);
  });

});
