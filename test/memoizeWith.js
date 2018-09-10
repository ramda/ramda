var R = require('../source');
var eq = require('./shared/eq');


describe('memoizeWith', function() {
  it('calculates the value for a given input only once', function() {
    var ctr = 0;
    var fib = R.memoizeWith(R.identity, function(n) {
      ctr += 1;
      return n < 2 ? n : fib(n - 2) + fib(n - 1);
    });
    var result = fib(10);
    eq(result, 55);
    eq(ctr, 11); // fib(0), fib(1), ... fib(10), no memoization would take 177 iterations.
  });

  it('handles multiple parameters', function() {
    var f = R.memoizeWith(function(a, b, c) {
      return a + b + c;
    }, function(a, b, c) {return a + ', ' + b + c;});
    eq(f('Hello', 'World' , '!'), 'Hello, World!');
    eq(f('Goodbye', 'Cruel World' , '!!!'), 'Goodbye, Cruel World!!!');
    eq(f('Hello', 'how are you' , '?'), 'Hello, how are you?');
    eq(f('Hello', 'World' , '!'), 'Hello, World!');
  });

  it('does not rely on reported arity', function() {
    var identity = R.memoizeWith(R.identity, function() { return arguments[0]; });
    eq(identity('x'), 'x');
    eq(identity('y'), 'y');
  });

  it('can be applied to nullary function', function() {
    var count = 0;
    var f = R.memoizeWith(R.identity, function() {
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
    var f = R.memoizeWith(R.concat, function concat(a, b) {
      count += 1;
      switch (arguments.length) {
        case 0: a = 'foo';
        case 1: b = 'bar';
      }
      return a + b;
    });
    eq(f(), 'foobar');
    eq(f(), 'foobar');
    eq(f(), 'foobar');
    eq(count, 1);
  });

  it('retains arity', function() {
    var f = R.memoizeWith(R.concat, function(a, b) { return a + b; });
    eq(f.length, 2);
  });

});
