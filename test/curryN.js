var R = require('../source');
var eq = require('./shared/eq');


describe('curryN', function() {
  function source(a, b, c, d) {
    void d;
    return a * b * c;
  }
  it('accepts an arity', function() {
    var curried = R.curryN(3, source);
    eq(curried(1)(2)(3), 6);
    eq(curried(1, 2)(3), 6);
    eq(curried(1)(2, 3), 6);
    eq(curried(1, 2, 3), 6);
  });

  it('can be partially applied', function() {
    var curry3 = R.curryN(3);
    var curried = curry3(source);
    eq(curried.length, 3);
    eq(curried(1)(2)(3), 6);
    eq(curried(1, 2)(3), 6);
    eq(curried(1)(2, 3), 6);
    eq(curried(1, 2, 3), 6);
  });

  it('preserves context', function() {
    var ctx = {x: 10};
    var f = function(a, b) { return a + b * this.x; };
    var g = R.curryN(2, f);

    eq(g.call(ctx, 2, 4), 42);
    eq(g.call(ctx, 2).call(ctx, 4), 42);
  });

  it('forwards extra arguments', function() {
    var f = function() { return Array.prototype.slice.call(arguments); };
    var g = R.curryN(3, f);

    eq(g(1, 2, 3), [1, 2, 3]);
    eq(g(1, 2, 3, 4), [1, 2, 3, 4]);
    eq(g(1, 2)(3, 4), [1, 2, 3, 4]);
    eq(g(1)(2, 3, 4), [1, 2, 3, 4]);
    eq(g(1)(2)(3, 4), [1, 2, 3, 4]);
  });

});
