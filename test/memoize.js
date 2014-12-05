var assert = require('assert');

var R = require('..');


describe('memoize', function() {
    it('calculates the value for a given input only once', function() {
        var ctr = 0;
        var fib = R.memoize(function(n) {ctr++; return n < 2 ? n : fib(n - 2) + fib(n - 1);});
        var result = fib(10);
        assert.strictEqual(result, 55);
        assert.strictEqual(ctr, 11); // fib(0), fib(1), ... fib(10), no memoization would take 177 iterations.
    });

    it('handles multiple parameters', function() {
        var f = R.memoize(function(a, b, c) {return a + ', ' + b + c;});
        assert.strictEqual(f('Hello', 'World' , '!'), 'Hello, World!');
        assert.strictEqual(f('Goodbye', 'Cruel World' , '!!!'), 'Goodbye, Cruel World!!!');
        assert.strictEqual(f('Hello', 'how are you' , '?'), 'Hello, how are you?');
        assert.strictEqual(f('Hello', 'World' , '!'), 'Hello, World!');
    });

    it('returns undefined if supplied no parameters for a positive arity function', function() {
        var fib = R.memoize(function(n) {return n < 2 ? n : fib(n - 2) + fib(n - 1);});
        assert.strictEqual(typeof fib(), 'undefined');
    });

    it('does not rely on reported arity', function() {
        var identity = R.memoize(function() { return arguments[0]; });
        assert.strictEqual(identity('x'), 'x');
        assert.strictEqual(identity('y'), 'y');
    });
});
