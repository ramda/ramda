var R = require('../source');
var eq = require('./shared/eq');


describe('pathSatisfies', function() {

  var isPositive = function(n) { return n > 0; };

  it('returns true if the specified object path satisfies the given predicate', function() {
    eq(R.pathSatisfies(isPositive, ['x', 1, 'y'], {x: [{y: -1}, {y: 1}]}), true);
  });

  it('returns false if the specified path does not exist', function() {
    eq(R.pathSatisfies(isPositive, ['x', 'y'], {x: {z: 42}}), false);
  });

  it('handles empty paths by applying pred to data: positive', function() {
    eq(R.pathSatisfies(R.is(Object), [], {x: {z: 42}}), true);
  });

  it('handles empty paths by applying pred to data: negative', function() {
    eq(R.pathSatisfies(R.has('y'), [], {x: {z: 42}}), false);
  });

  it('returns false otherwise', function() {
    eq(R.pathSatisfies(isPositive, ['x', 'y'], {x: {y: 0}}), false);
  });

});
