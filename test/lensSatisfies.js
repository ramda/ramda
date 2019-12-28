var R = require('../source');
var eq = require('./shared/eq');


describe('lensSatisfies', function() {

  var isPositive = function(n) { return n > 0; };

  it('returns true if the specified object property, the lens focused on, satisfies the given predicate', function() {
    var xLens = R.lensProp('x');
    eq(R.lensSatisfies(isPositive, xLens, {x: 1, y: 0}), true);
  });

  it('returns false otherwise', function() {
    var yLens = R.lensProp('y');
    eq(R.lensSatisfies(isPositive, yLens, {x: 1, y: 0}), false);
  });

  it('returns false if given a null or undefined object', function() {
    var yLens = R.lensProp('y');
    eq(R.lensSatisfies(isPositive, yLens, null), false);
    eq(R.lensSatisfies(isPositive, yLens, undefined), false);
  });

});
