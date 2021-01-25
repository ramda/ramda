var R = require('../source');
var eq = require('./shared/eq');
var fc = require('fast-check');


describe('o', function() {

  it('is not a variadic function', function() {
    eq(typeof R.o, 'function');
    eq(R.o.length, 3);
  });

  it('is a curried function', function() {
    eq(R.o(R.add(1), R.multiply(2), 10), R.o(R.add(1))(R.multiply(2))(10));
  });

  it('performs right-to-left function composition', function() {
    //  f :: Number -> ([Number] -> [Number])
    var f = R.o(R.map, R.multiply);

    eq(f.length, 1);
    eq(f(10)([1, 2, 3]), [10, 20, 30]);
  });

  describe('o properties', function() {

    it('composes two functions', function() {
      fc.assert(fc.property(fc.func(fc.nat()), fc.func(fc.nat()), fc.nat(), function(f, g, x) {
        return R.equals(R.o(f, g)(x), f(g(x)));
      }));
    });

    it('associative', function() {
      fc.assert(fc.property(fc.func(fc.nat()), fc.func(fc.nat()), fc.func(fc.nat()), fc.nat(), function(f, g, h, x) {
        var result = f(g(h(x)));
        var fg = R.o(f, g);
        var gh = R.o(g, h);
        return R.all(R.equals(result), [
          R.o(f, gh, x),
          R.o(fg, h, x),
          R.o(f, gh)(x),
          R.o(fg, h)(x)
        ]);
      }));
    });
  });
});
