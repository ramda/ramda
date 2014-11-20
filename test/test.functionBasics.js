var assert = require('assert');
var R = require('..');

describe('apply', function() {
    it('applies function to argument list', function() {
        assert.strictEqual(R.apply(Math.max, [1, 2, 3, -99, 42, 6, 7]), 42);
    });

    it('is automatically curried', function() {
        assert.strictEqual(R.apply(Math.max)([1, 2, 3, -99, 42, 6, 7]), 42);
    });

    it('provides no way to specify context', function() {
        var obj = {method: function() { return this === obj; }};
        assert.strictEqual(R.apply(obj.method, []), false);
        assert.strictEqual(R.apply(R.bind(obj.method, obj), []), true);
    });
});

describe('unapply', function() {
    it('returns a function which is always passed one argument', function() {
        var fn = R.unapply(function() { return arguments.length; });
        assert.strictEqual(fn(), 1);
        assert.strictEqual(fn('x'), 1);
        assert.strictEqual(fn('x', 'y'), 1);
        assert.strictEqual(fn('x', 'y', 'z'), 1);
    });

    it('forwards arguments to decorated function as an array', function() {
        var fn = R.unapply(function(xs) { return '[' + xs + ']'; });
        assert.strictEqual(fn(), '[]');
        assert.strictEqual(fn(2), '[2]');
        assert.strictEqual(fn(2, 4), '[2,4]');
        assert.strictEqual(fn(2, 4, 6), '[2,4,6]');
    });

    it('returns a function with length 0', function() {
        var fn = R.unapply(R.identity);
        assert.strictEqual(fn.length, 0);
    });

    it('throws on zero arguments', function() {
        assert.throws(R.unapply, TypeError);
    });

    it('is the inverse of R.apply', function() {
        var a, b, c, d, e, f, g, idx;
        var rand = function() {
            return Math.floor(200 * Math.random()) - 100;
        };

        f = Math.max;
        g = R.unapply(R.apply(f));
        idx = 100;
        while (idx--) {
            a = rand(); b = rand(); c = rand(); d = rand(); e = rand();
            assert.strictEqual(f(a, b, c, d, e), g(a, b, c, d, e));
        }

        f = function(xs) { return '[' + xs + ']'; };
        g = R.apply(R.unapply(f));
        idx = 100;
        while (idx--) {
            a = rand(); b = rand(); c = rand(); d = rand(); e = rand();
            assert.strictEqual(f([a, b, c, d, e]), g([a, b, c, d, e]));
        }
    });
});

describe('flip', function() {
    it('returns a function which inverts the first two arguments to the supplied function', function() {
        var f = function(a, b, c) {return a + ' ' + b + ' ' + c;};
        var g = R.flip(f);
        assert.equal(f('a', 'b', 'c'), 'a b c');
        assert.equal(g('a', 'b', 'c'), 'b a c');
    });

    it('returns a curried function', function() {
        var f = function(a, b, c) {return a + ' ' + b + ' ' + c;};
        var g = R.flip(f)('a');
        assert.equal(g('b', 'c'), 'b a c');
    });

    it('produces a function that throws if given no arguments', function() {
        var f = function(x, y) { return x + ' then ' + y; };
        var g = R.flip(f);
        assert.throws(g, TypeError);
    });
});

describe('once', function() {
    it('returns a function that calls the supplied function only the first time called', function() {
        var ctr = 0;
        var fn = R.once(function() {ctr++;});
        fn();
        assert.equal(ctr, 1);
        fn();
        assert.equal(ctr, 1);
        fn();
        assert.equal(ctr, 1);
    });

    it('passes along arguments supplied', function() {
        var fn = R.once(function(a, b) {return a + b;});
        var result = fn(5, 10);
        assert.equal(result, 15);
    });

    it('retains and returns the first value calculated, even if different arguments are passed later', function() {
        var ctr = 0;
        var fn = R.once(function(a, b) {ctr++; return a + b;});
        var result = fn(5, 10);
        assert.equal(result, 15);
        assert.equal(ctr, 1);
        result = fn(20, 30);
        assert.equal(result, 15);
        assert.equal(ctr, 1);
    });
});

describe('memoize', function() {
    it('calculates the value for a given input only once', function() {
        var ctr = 0;
        var fib = R.memoize(function(n) {ctr++; return n < 2 ? n : fib(n - 2) + fib(n - 1);});
        var result = fib(10);
        assert.equal(result, 55);
        assert.equal(ctr, 11); // fib(0), fib(1), ... fib(10), no memoization would take 177 iterations.
    });

    it('handles multiple parameters', function() {
        var f = R.memoize(function(a, b, c) {return a + ', ' + b + c;});
        assert.equal(f('Hello', 'World' , '!'), 'Hello, World!');
        assert.equal(f('Goodbye', 'Cruel World' , '!!!'), 'Goodbye, Cruel World!!!');
        assert.equal(f('Hello', 'how are you' , '?'), 'Hello, how are you?');
        assert.equal(f('Hello', 'World' , '!'), 'Hello, World!');
    });

    it('returns undefined if supplied no parameters for a positive arity function', function() {
        var fib = R.memoize(function(n) {return n < 2 ? n : fib(n - 2) + fib(n - 1);});
        assert.equal(typeof fib(), 'undefined');
    });
});

describe('construct', function() {
    var Rectangle = function(w, h) {this.width = w; this.height = h;};
    Rectangle.prototype.area = function() {return this.width * this.height;};

    it('turns a constructor function into one that can be called without `new`', function() {
        var rect = R.construct(Rectangle);
        var r1 = rect(3, 4);
        assert(r1 instanceof Rectangle);
        assert.equal(r1.width, 3);
        assert.equal(r1.area(), 12);

        var regex = R.construct(RegExp);
        var word = regex('word', 'gi');
        assert(word instanceof RegExp);
        assert.equal(word.source, 'word');
        assert.equal(word.global, true);
    });

    it('returns a curried function', function() {
        var rect = R.construct(Rectangle);
        var rect3 = rect(3);
        var r1 = rect3(4);
        assert(r1 instanceof Rectangle);
        assert.equal(r1.width, 3);
        assert.equal(r1.height, 4);
        assert.equal(r1.area(), 12);

        var regex = R.construct(RegExp);
        var word = regex('word');
        var complete = word('gi');
        assert(complete instanceof RegExp);
        assert.equal(complete.source, 'word');
        assert.equal(complete.global, true);
    });
});

describe('constructN', function() {
    var Circle = function(r) {
        this.r = r;
        this.colors = Array.prototype.slice.call(arguments, 1);
    };
    Circle.prototype.area = function() {return Math.PI * Math.pow(this.r, 2);};

    it('turns a constructor function into a function with n arguments', function() {
        var circle = R.constructN(2, Circle);
        var c1 = circle(1, 'red');
        assert(c1 instanceof Circle);
        assert.equal(c1.r, 1);
        assert.equal(c1.area(), Math.PI);
        assert.deepEqual(c1.colors, ['red']);

        var regex = R.constructN(1, RegExp);
        var pattern = regex('[a-z]');
        assert(pattern instanceof RegExp);
        assert.equal(pattern.source, '[a-z]');
    });

    it('is curried', function() {
        function G(a, b, c) { this.a = a; this.b = b; this.c = c; }
        var construct2 = R.constructN(2);
        assert(typeof construct2 === 'function');
        var g2 = construct2(G);
        assert(typeof g2 === 'function');
        assert(g2('a', 'b') instanceof G);
        assert(g2('a')('b') instanceof G);
    });

    it('throws on zero arguments', function() {
        assert.throws(R.constructN, TypeError);
    });
});

describe('unary', function() {
    it('turns multiple-argument function into unary one', function() {
        R.unary(function(x, y, z) {
            assert.equal(arguments.length, 1);
            assert.equal(typeof y, 'undefined');
            assert.equal(typeof z, 'undefined');
        })(10, 20, 30);
    });

    it('initial argument is passed through normally', function() {
        R.unary(function(x, y, z) {
            assert.equal(x, 10);
            void z;
        })(10, 20, 30);
    });
});

describe('binary', function() {
    it('turns multiple-argument function into binary one', function() {
        R.binary(function(x, y, z) {
            assert.equal(arguments.length, 2);
            assert.equal(typeof z, 'undefined');
        })(10, 20, 30);
    });

    it('initial arguments are passed through normally', function() {
        R.binary(function(x, y, z) {
            assert.equal(x, 10);
            assert.equal(y, 20);
            void z;
        })(10, 20, 30);
    });
});

describe('nAry', function() {

    function toArray(args) { return Array.prototype.slice.call(args, 0); }

    it('turns multiple-argument function into a nullary one', function() {
        var fn = R.nAry(0, function(x, y, z) { void z; return toArray(arguments); });
        assert.equal(fn.length, 0);
        assert.deepEqual(fn(1, 2, 3), []);
    });

    it('turns multiple-argument function into a ternary one', function() {
        var fn = R.nAry(3, function(a, b, c, d) { void d; return toArray(arguments); });
        assert.equal(fn.length, 3);
        assert.deepEqual(fn(1, 2, 3, 4), [1, 2, 3]);
        assert.deepEqual(fn(1), [1, undefined, undefined]);
    });

    it('creates functions of arbitrary arity', function() {
        var fn = R.nAry(10, function() { return toArray(arguments); });
        assert.equal(fn.length, 10);
        assert.deepEqual(fn.apply(null, R.range(0, 25)), R.range(0, 10));

        var undefs = fn();
        var ns = R.repeatN(undefined, 10);
        assert(undefs.length === ns.length);
        var idx = undefs.length;
        while (--idx) {
            assert(undefs[idx] === ns[idx]);
        }
    });
});

describe('ap', function() {
    function mult2(x) { return x * 2; }
    function plus3(x) { return x + 3; }

    it('applies a list of functions to a list of values', function() {
        assert.deepEqual(R.ap([mult2, plus3], [1, 2, 3]), [2, 4, 6, 4, 5, 6]);
    });

    it('dispatches to the passed object\'s ap method when values is a non-Array object', function() {
        var obj = {ap: function(n) { return 'called ap with ' + n; }};
        assert.deepEqual(R.ap(obj, 10), obj.ap(10));
    });

    it('is curried', function() {
        var val = R.ap([mult2, plus3]);
        assert.equal(typeof val, 'function');
        assert.deepEqual(val([1, 2, 3]), [2, 4, 6, 4, 5, 6]);
    });
});
