var assert = require('assert');

var R = require('..');


describe('curryN', function() {
    function source(a, b, c, d) {
        void d;
        return a * b * c;
    }
    it('accepts an arity', function() {
        var curried = R.curryN(3, source);
        assert.strictEqual(curried(1)(2)(3), 6);
        assert.strictEqual(curried(1, 2)(3), 6);
        assert.strictEqual(curried(1)(2, 3), 6);
        assert.strictEqual(curried(1, 2, 3), 6);
    });

    it('can be partially applied', function() {
        var curry3 = R.curryN(3);
        var curried = curry3(source);
        assert.strictEqual(curried.length, 3);
        assert.strictEqual(curried(1)(2)(3), 6);
        assert.strictEqual(curried(1, 2)(3), 6);
        assert.strictEqual(curried(1)(2, 3), 6);
        assert.strictEqual(curried(1, 2, 3), 6);
    });

    it('preserves context', function() {
        var ctx = {x: 10};
        var f = function(a, b) { return a + b * this.x; };
        var g = R.curryN(2, f);

        assert.strictEqual(g.call(ctx, 2, 4), 42);
        assert.strictEqual(g.call(ctx, 2).call(ctx, 4), 42);
    });

    it('supports R.__ placeholder', function() {
        var f = function() { return Array.prototype.slice.call(arguments); };
        var g = R.curryN(3, f);
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
        var f = function() { return Array.prototype.slice.call(arguments); };
        var g = R.curryN(3, f);

        assert.deepEqual(g(1, 2, 3), [1, 2, 3]);
        assert.deepEqual(g(1, 2, 3, 4), [1, 2, 3, 4]);
        assert.deepEqual(g(1, 2)(3, 4), [1, 2, 3, 4]);
        assert.deepEqual(g(1)(2, 3, 4), [1, 2, 3, 4]);
        assert.deepEqual(g(1)(2)(3, 4), [1, 2, 3, 4]);
    });
});
