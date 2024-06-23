var assert = require('assert');

var R = require('../source/index.js');
var eq = require('./shared/eq.js');


describe('last', function() {

  it('returns the last element of an ordered collection', function() {
    eq(R.last([1, 2, 3]), 3);
    eq(R.last([1, 2]), 2);
    eq(R.last([1]), 1);
    eq(R.last([]), undefined);

    eq(R.last('abc'), 'c');
    eq(R.last('ab'), 'b');
    eq(R.last('a'), 'a');
    eq(R.last(''), undefined);
  });

  it('throws if applied to null or undefined', function() {
    assert.throws(function() { R.last(null); }, TypeError);
    assert.throws(function() { R.last(undefined); }, TypeError);
  });

});
