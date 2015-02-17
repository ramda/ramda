var assert = require('assert');

var R = require('..');


describe('curry', function() {
    it('curries a single value', function() {
        var f = R.curry(function(a, b, c, d) {return (a + b * c) / d;}); // f(12, 3, 6, 2) == 15
        var g = f(12);
        assert.strictEqual(g(3, 6, 2), 15);
    });

    it('curries multiple values', function() {
        var f = R.curry(function(a, b, c, d) {return (a + b * c) / d;}); // f(12, 3, 6, 2) == 15
        var g = f(12, 3);
        assert.strictEqual(g(6, 2), 15);
        var h = f(12, 3, 6);
        assert.strictEqual(h(2), 15);
    });

    it('allows further currying of a curried function', function() {
        var f = R.curry(function(a, b, c, d) {return (a + b * c) / d;}); // f(12, 3, 6, 2) == 15
        var g = f(12);
        assert.strictEqual(g(3, 6, 2), 15);
        var h = g(3);
        assert.strictEqual(h(6, 2), 15);
        assert.strictEqual(g(3, 6)(2), 15);
    });

    it('properly reports the length of the curried function', function() {
        var f = R.curry(function(a, b, c, d) {return (a + b * c) / d;});
        assert.strictEqual(f.length, 4);
        var g = f(12);
        assert.strictEqual(g.length, 3);
        var h = g(3);
        assert.strictEqual(h.length, 2);
        assert.strictEqual(g(3, 6).length, 1);
    });

    it('preserves context', function() {
        var ctx = {x: 10};
        var f = function(a, b) { return a + b * this.x; };
        var g = R.curry(f);

        assert.strictEqual(g.call(ctx, 2, 4), 42);
        assert.strictEqual(g.call(ctx, 2).call(ctx, 4), 42);
    });

    it('supports R.__ placeholder', function() {
        var f = function(a, b, c) { return [a, b, c]; };
        var g = R.curry(f);
        var _ = R.__;

        assert.deepEqual(g(1)(2)(3), [1, 2, 3]);
        assert.deepEqual(g(1)(2, 3), [1, 2, 3]);
        assert.deepEqual(g(1, 2)(3), [1, 2, 3]);
        assert.deepEqual(g(1, 2, 3), [1, 2, 3]);

        assert.deepEqual(g(_, 2, 3)(1), [1, 2, 3]);
        assert.deepEqual(g(1, _, 3)(2), [1, 2, 3]);
        assert.deepEqual(g(1, 2, _)(3), [1, 2, 3]);

        assert.deepEqual(g(1, _, _)(2)(3), [1, 2, 3]);
        assert.deepEqual(g(_, 2, _)(1)(3), [1, 2, 3]);
        assert.deepEqual(g(_, _, 3)(1)(2), [1, 2, 3]);

        assert.deepEqual(g(1, _, _)(2, 3), [1, 2, 3]);
        assert.deepEqual(g(_, 2, _)(1, 3), [1, 2, 3]);
        assert.deepEqual(g(_, _, 3)(1, 2), [1, 2, 3]);

        assert.deepEqual(g(1, _, _)(_, 3)(2), [1, 2, 3]);
        assert.deepEqual(g(_, 2, _)(_, 3)(1), [1, 2, 3]);
        assert.deepEqual(g(_, _, 3)(_, 2)(1), [1, 2, 3]);

        assert.deepEqual(g(_, _, _)(_, _)(_)(1, 2, 3), [1, 2, 3]);
        assert.deepEqual(g(_, _, _)(1, _, _)(_, _)(2, _)(_)(3), [1, 2, 3]);
    });

    it('forwards extra arguments', function() {
        var f = function(a, b, c) {
            void c;
            return Array.prototype.slice.call(arguments);
        };
        var g = R.curry(f);

        assert.deepEqual(g(1, 2, 3), [1, 2, 3]);
        assert.deepEqual(g(1, 2, 3, 4), [1, 2, 3, 4]);
        assert.deepEqual(g(1, 2)(3, 4), [1, 2, 3, 4]);
        assert.deepEqual(g(1)(2, 3, 4), [1, 2, 3, 4]);
        assert.deepEqual(g(1)(2)(3, 4), [1, 2, 3, 4]);
    });
});
