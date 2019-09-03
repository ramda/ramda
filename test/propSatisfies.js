var R = require('../source');
var eq = require('./shared/eq');


describe('propSatisfies', function() {

  var isPositive = function(n) { return n > 0; };

  it('returns true if the specified object property satisfies the given predicate', function() {
    eq(R.propSatisfies(isPositive, 'x', {x: 1, y: 0}), true);
  });

  it('returns false otherwise', function() {
    eq(R.propSatisfies(isPositive, 'y', {x: 1, y: 0}), false);
  });

  it('returns false if given a null or undefined object', function() {
    eq(R.propSatisfies(isPositive, 'y', null), false);
    eq(R.propSatisfies(isPositive, 'y', undefined), false);
  });

});
