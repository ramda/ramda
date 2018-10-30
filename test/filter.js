var assert = require('assert');

var R = require('../source');
var eq = require('./shared/eq');
var throwReduceTypeError = require('./helpers/throwReduceTypeError');


describe('filter', function() {
  var even = function(x) {return x % 2 === 0;};
  var quintuple = function(x) {return x % 5 === 0;};

  it('reduces an array to those matching a filter', function() {
    eq(R.filter(even, [1, 2, 3, 4, 5]), [2, 4]);
  });

  it('returns an empty array if no element matches', function() {
    eq(R.filter(function(x) { return x > 100; }, [1, 9, 99]), []);
  });

  it('returns an empty array if asked to filter an empty array', function() {
    eq(R.filter(function(x) { return x > 100; }, []), []);
  });

  it('filters objects', function() {
    var positive = function(x) { return x > 0; };
    eq(R.filter(positive, {}), {});
    eq(R.filter(positive, {x: 0, y: 0, z: 0}), {});
    eq(R.filter(positive, {x: 1, y: 0, z: 0}), {x: 1});
    eq(R.filter(positive, {x: 1, y: 2, z: 0}), {x: 1, y: 2});
    eq(R.filter(positive, {x: 1, y: 2, z: 3}), {x: 1, y: 2, z: 3});
  });

  it('dispatches to passed-in non-Array object with a `filter` method', function() {
    var f = {filter: function(f) { return f('called f.filter'); }};
    eq(R.filter(function(s) { return s; }, f), 'called f.filter');
  });

  it('composes with object inputs using R.into', function() {
    var fn = R.compose(R.filter(even), R.filter(quintuple));
    eq(R.into({}, fn, {a: 5, b: 10, c: 2}), {b: 10});
  });

  it('does not filter with objects inputs and array acummulator using R.into', function() {
    var fn = R.compose(R.filter(even), R.filter(quintuple));
    assert.throws(function() {
      R.into([], fn, {a: 5, b: 10, c: 2});
    }, throwReduceTypeError);
  });

});
