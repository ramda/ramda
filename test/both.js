var S = require('sanctuary');

var R = require('../source');
var eq = require('./shared/eq');


describe('both', function() {
  it('combines two boolean-returning functions into one', function() {
    var even = function(x) {return x % 2 === 0;};
    var gt10 = function(x) {return x > 10;};
    var f = R.both(even, gt10);
    eq(f(8), false);
    eq(f(13), false);
    eq(f(14), true);
  });

  it('accepts functions that take multiple parameters', function() {
    var between = function(a, b, c) {return a < b && b < c;};
    var total20 = function(a, b, c) {return a + b + c === 20;};
    var f = R.both(between, total20);
    eq(f(4, 5, 11), true);
    eq(f(12, 2, 6), false);
    eq(f(5, 6, 15), false);
  });

  it('does not evaluate the second expression if the first one is false', function() {
    var F = function() { return false; };
    var Z = function() { effect = 'Z got evaluated'; };
    var effect = 'not evaluated';
    R.both(F, Z)();
    eq(effect, 'not evaluated');
  });

  it('accepts fantasy-land applicative functors', function() {
    var Just = S.Just;
    var Nothing = S.Nothing;
    eq(R.both(Just(true), Just(true)), Just(true));
    eq(R.both(Just(true), Just(false)), Just(false));
    eq(R.both(Just(true), Nothing()), Nothing());
    eq(R.both(Nothing(), Just(false)), Nothing());
    eq(R.both(Nothing(), Nothing()), Nothing());
  });

});
