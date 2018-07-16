var R = require('..');
var eq = require('./shared/eq');


describe('propSatisfies returns Boolean taking predicate', function() {

  var isPositive = function(n) { return n > 0; };

  it('returns true if the specified object property satisfies the given predicate', function() {
    eq(R.propSatisfies(isPositive, 'x', {x: 1, y: 0}), true);
  });

  it('returns false otherwise', function() {
    eq(R.propSatisfies(isPositive, 'y', {x: 1, y: 0}), false);
  });

});


describe('propSatisfies returns Boolean taking function that returns falsy or truthy value', function() {

  var identity = function(n) { return n; };

  it('returns true if the specified object property satisfies the given function', function() {
    eq(R.propSatisfies(identity, 'x', {x: 1, y: 0}), true);
  });

  it('returns false otherwise', function() {
    eq(R.propSatisfies(identity, 'y', {x: 1, y: 0}), false);
  });

});
