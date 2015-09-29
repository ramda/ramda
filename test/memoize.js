var R = require('..');
var eq = require('./shared/eq');


describe('memoize', function() {
  it('calculates the value for a given input only once', function() {
    var ctr = 0;
    var fib = R.memoize(function(n) {ctr += 1; return n < 2 ? n : fib(n - 2) + fib(n - 1);});
    var result = fib(10);
    eq(result, 55);
    eq(ctr, 11); // fib(0), fib(1), ... fib(10), no memoization would take 177 iterations.
  });

  it('handles multiple parameters', function() {
    var f = R.memoize(function(a, b, c) {return a + ', ' + b + c;});
    eq(f('Hello', 'World' , '!'), 'Hello, World!');
    eq(f('Goodbye', 'Cruel World' , '!!!'), 'Goodbye, Cruel World!!!');
    eq(f('Hello', 'how are you' , '?'), 'Hello, how are you?');
    eq(f('Hello', 'World' , '!'), 'Hello, World!');
  });

  it('does not rely on reported arity', function() {
    var identity = R.memoize(function() { return arguments[0]; });
    eq(identity('x'), 'x');
    eq(identity('y'), 'y');
  });

  it('memoizes "false" return values', function() {
    var count = 0;
    var inc = R.memoize(function(n) {
      count += 1;
      return n + 1;
    });
    eq(inc(-1), 0);
    eq(inc(-1), 0);
    eq(inc(-1), 0);
    eq(count, 1);
  });

  it('can be applied to nullary function', function() {
    var count = 0;
    var f = R.memoize(function() {
      count += 1;
      return 42;
    });
    eq(f(), 42);
    eq(f(), 42);
    eq(f(), 42);
    eq(count, 1);
  });

  it('can be applied to function with optional arguments', function() {
    var count = 0;
    var f = R.memoize(function concat(a, b) {
      count += 1;
      switch (arguments.length) {
        case 0: a = 'foo';  // jshint ignore:line
        case 1: b = 'bar';
      }
      return a + b;
    });
    eq(f(), 'foobar');
    eq(f(), 'foobar');
    eq(f(), 'foobar');
    eq(count, 1);
  });

  it('differentiates values with same string representation', function() {
    var f = R.memoize(R.toString);
    eq(f(42), '42');
    eq(f('42'), '"42"');
    eq(f([[42]]), '[[42]]');
    eq(f([['42']]), '[["42"]]');
  });

  it('respects object equivalence', function() {
    var count = 0;
    var f = R.memoize(function(x) {
      count += 1;
      return R.toString(x);
    });
    eq(f({x: 1, y: 2}), '{"x": 1, "y": 2}');
    eq(f({x: 1, y: 2}), '{"x": 1, "y": 2}');
    eq(f({y: 2, x: 1}), '{"x": 1, "y": 2}');
    eq(count, 1);
  });
});
