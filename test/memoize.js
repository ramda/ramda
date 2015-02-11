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

    it('does not rely on reported arity', function() {
        var identity = R.memoize(function() { return arguments[0]; });
        assert.strictEqual(identity('x'), 'x');
        assert.strictEqual(identity('y'), 'y');
    });

    it('memoizes "false" return values', function() {
        var count = 0;
        var inc = R.memoize(function(n) {
            count += 1;
            return n + 1;
        });
        assert.strictEqual(inc(-1), 0);
        assert.strictEqual(inc(-1), 0);
        assert.strictEqual(inc(-1), 0);
        assert.strictEqual(count, 1);
    });

    it('can be applied to nullary function', function() {
        var count = 0;
        var f = R.memoize(function() {
            count += 1;
            return 42;
        });
        assert.strictEqual(f(), 42);
        assert.strictEqual(f(), 42);
        assert.strictEqual(f(), 42);
        assert.strictEqual(count, 1);
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
        assert.strictEqual(f(), 'foobar');
        assert.strictEqual(f(), 'foobar');
        assert.strictEqual(f(), 'foobar');
        assert.strictEqual(count, 1);
    });

    it('differentiates values with same string representation', function() {
        var f = R.memoize(function(x) { return x; });
        assert.strictEqual(f(42), 42);
        assert.strictEqual(f('42'), '42');
    });
});
