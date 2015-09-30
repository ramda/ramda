var R = require('..');
var eq = require('./shared/eq');


describe('complement', function() {
  it('creates boolean-returning function that reverses another', function() {
    var even = function(x) {return x % 2 === 0;};
    var f = R.complement(even);
    eq(f(8), false);
    eq(f(13), true);
  });

  it('accepts a function that take multiple parameters', function() {
    var between = function(a, b, c) {return a < b && b < c;};
    var f = R.complement(between);
    eq(f(4, 5, 11), false);
    eq(f(12, 2, 6), true);
  });
});
