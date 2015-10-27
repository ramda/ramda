var R = require('..');
var eq = require('./shared/eq');


describe('either', function() {
  it('combines two boolean-returning functions into one', function() {
    var even = function(x) {return x % 2 === 0;};
    var gt10 = function(x) {return x > 10;};
    var f = R.either(even, gt10);
    eq(f(8), true);
    eq(f(13), true);
    eq(f(7), false);
  });

  it('accepts functions that take multiple parameters', function() {
    var between = function(a, b, c) {return a < b && b < c;};
    var total20 = function(a, b, c) {return a + b + c === 20;};
    var f = R.either(between, total20);
    eq(f(4, 5, 8), true);
    eq(f(12, 2, 6), true);
    eq(f(7, 5, 1), false);
  });

  it('does not evaluate the second expression if the first one is true', function() {
    var T = function() { return true; };
    var Z = function() { effect = 'Z got evaluated'; };
    var effect = 'not evaluated';
    R.either(T, Z)();
    eq(effect, 'not evaluated');
  });

  it('is curried', function() {
    var even = function(x) {return x % 2 === 0;};
    var gt10 = function(x) {return x > 10;};
    var evenOr = R.either(even);
    eq(typeof evenOr(gt10), 'function');
    eq(evenOr(gt10)(11), true);
    eq(evenOr(gt10)(9), false);
  });

});
