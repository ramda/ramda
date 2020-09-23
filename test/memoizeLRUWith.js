var R = require('../source');
var memoizeLRUWith = require('../source/memoizeLRUWith');
var eq = require('./shared/eq');


describe('memoizeLRUWith', function() {
  it('calculates the value for a given input only once when not exceed lru size', function() {
    var ctr = 0;
    var fib = memoizeLRUWith(11, R.identity, function(n) {
      ctr += 1;
      return n < 2 ? n : fib(n - 2) + fib(n - 1);
    });
    var result = fib(10);
    eq(result, 55);
    eq(ctr, 11); // fib(0), fib(1), ... fib(10), no memoization would take 177 iterations.
  });

  it('calculates the value for a given input will twice when exceed lru size', function() {
    var ctr = 0;
    var fib = memoizeLRUWith(10, R.identity, function(n) {
      ctr += 1;
      return n < 2 ? n : fib(n - 2) + fib(n - 1);
    });
    var result = fib(10);
    eq(result, 55);
    eq(ctr, 11); // fib(0), fib(1), ... fib(10), no memoization would take 177 iterations.

    fib(0);
    eq(ctr, 12); // fib(0) discard. and after fib(0) then fib(1) is discard. fib(2) still in memory
    fib(0);
    fib(2);
    eq(ctr, 12);
    fib(1);
    eq(ctr, 13);
  });

  it('handles multiple parameters', function() {
    var f = memoizeLRUWith(100, function(a, b, c) {
      return a + b + c;
    }, function(a, b, c) {return a + ', ' + b + c;});
    eq(f('Hello', 'World' , '!'), 'Hello, World!');
    eq(f('Goodbye', 'Cruel World' , '!!!'), 'Goodbye, Cruel World!!!');
    eq(f('Hello', 'how are you' , '?'), 'Hello, how are you?');
    eq(f('Hello', 'World' , '!'), 'Hello, World!');
  });

  it('does not rely on reported arity', function() {
    var identity = memoizeLRUWith(100, R.identity, function() { return arguments[0]; });
    eq(identity('x'), 'x');
    eq(identity('y'), 'y');
  });

  it('can be applied to nullary function', function() {
    var count = 0;
    var f = memoizeLRUWith(100, R.identity, function() {
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
    var f = memoizeLRUWith(100, R.concat, function concat(a, b) {
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
    var f = memoizeLRUWith(100, R.concat, function(a, b) { return a + b; });
    eq(f.length, 2);
  });

});
