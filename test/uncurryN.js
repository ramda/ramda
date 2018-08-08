var R = require('../source');
var eq = require('./shared/eq');


describe('uncurryN', function() {
  function a2(a) {
    return function(b) {
      return a + b;
    };
  }

  function a3(a) {
    return function(b) {
      return function(c) {
        return a + b + c;
      };
    };
  }

  function a3b(a) {
    return function(b) {
      return function(c) {
        return a + b + c + (arguments[1] || 0) + (arguments[2] || 0);
      };
    };
  }

  function a4(a) {
    return function(b) {
      return function(c) {
        return function(d) {
          return a + b + c + d;
        };
      };
    };
  }

  it('accepts an arity', function() {
    var uncurried = R.uncurryN(3, a3);
    eq(uncurried(1, 2, 3), 6);
  });

  it('returns a function of the specified arity', function() {
    eq(R.uncurryN(2, a2).length, 2);
    eq(R.uncurryN(3, a3).length, 3);
    eq(R.uncurryN(4, a4).length, 4);
  });

  it('forwards extra arguments', function() {
    var g = R.uncurryN(3, a3b);

    eq(g(1, 2, 3), 6);
    eq(g(1, 2, 3, 4), 10);
    eq(g(1, 2, 3, 4, 5), 15);
  });

  it('works with ordinary uncurried functions', function() {
    eq(R.uncurryN(2, function(a, b) { return a + b; })(10, 20), 30);
    eq(R.uncurryN(3, function(a, b, c) { return a + b + c; })(10, 20, 30), 60);
  });

  it('works with ramda-curried functions', function() {
    eq(R.uncurryN(2, R.add)(10, 20), 30);
  });

});
