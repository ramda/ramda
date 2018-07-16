var R = require('..');
var eq = require('./shared/eq');


describe('pathSatisfies returns Boolean taking predicate', function() {

  var isPositive = function(n) { return n > 0; };

  it('returns true if the specified object path satisfies the given predicate', function() {
    eq(R.pathSatisfies(isPositive, ['x', 1, 'y'], {x: [{y: -1}, {y: 1}]}), true);
  });

  it('returns false if the specified path does not exist', function() {
    eq(R.pathSatisfies(isPositive, ['x', 'y'], {x: {z: 42}}), false);
  });

  it('returns false if the path is empty', function() {
    eq(R.pathSatisfies(isPositive, [], {x: {z: 42}}), false);
  });

  it('returns false otherwise', function() {
    eq(R.pathSatisfies(isPositive, ['x', 'y'], {x: {y: 0}}), false);
  });

});

describe('pathSatisfies returns Boolean taking function that returns falsy or truthy value', function() {

  var identity = function(n) { return n; };

  it('returns true if the specified object property satisfies the given function', function() {
    eq(R.pathSatisfies(identity, ['x', 1, 'y'], {x: [{y: -1}, {y: 1}]}), true);
  });

  it('returns false if the specified object path doesn\'t satisfy the given function', function() {
    eq(R.pathSatisfies(identity, ['x', 'y'], {x: {y: 0}}), false);
  });

});
