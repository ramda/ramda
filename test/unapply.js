var R = require('../source');
var eq = require('./shared/eq');


describe('unapply', function() {
  it('returns a function which is always passed one argument', function() {
    var fn = R.unapply(function() { return arguments.length; });
    eq(fn(), 1);
    eq(fn('x'), 1);
    eq(fn('x', 'y'), 1);
    eq(fn('x', 'y', 'z'), 1);
  });

  it('forwards arguments to decorated function as an array', function() {
    var fn = R.unapply(function(xs) { return '[' + xs + ']'; });
    eq(fn(), '[]');
    eq(fn(2), '[2]');
    eq(fn(2, 4), '[2,4]');
    eq(fn(2, 4, 6), '[2,4,6]');
  });

  it('returns a function with length 0', function() {
    var fn = R.unapply(R.identity);
    eq(fn.length, 0);
  });

  it('is the inverse of R.apply', function() {
    var a, b, c, d, e, f, g, n;
    var rand = function() {
      return Math.floor(200 * Math.random()) - 100;
    };

    f = Math.max;
    g = R.unapply(R.apply(f));
    n = 1;
    while (n <= 100) {
      a = rand(); b = rand(); c = rand(); d = rand(); e = rand();
      eq(f(a, b, c, d, e), g(a, b, c, d, e));
      n += 1;
    }

    f = function(xs) { return '[' + xs + ']'; };
    g = R.apply(R.unapply(f));
    n = 1;
    while (n <= 100) {
      a = rand(); b = rand(); c = rand(); d = rand(); e = rand();
      eq(f([a, b, c, d, e]), g([a, b, c, d, e]));
      n += 1;
    }
  });

});
