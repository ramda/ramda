var assert = require('assert');

var R = require('..');
var eq = require('./shared/eq');


describe('first', function() {

  it('returns the first element of an ordered collection', function() {
    eq(R.first([1, 2, 3]), 1);
    eq(R.first([1]), 1);
    eq(R.first([]), undefined);

    eq(R.first('abc'), 'c');
    eq(R.first('a'), 'a');
    eq(R.first(''), '');
  });

  it('throws if applied to null or undefined', function() {
    assert.throws(function() { R.first(null); }, TypeError);
    assert.throws(function() { R.first(undefined); }, TypeError);
  });

});
