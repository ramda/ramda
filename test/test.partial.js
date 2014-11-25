var assert = require('assert');
var R = require('..');

describe('lPartial', function() {
    var disc = function(a, b, c) { // note disc(3, 7, 4) => 1
        return b * b - 4 * a * c;
    };

    it('caches the initially supplied left-most parameters in the generated function', function() {
        var f = R.lPartial(disc, 3);
        assert.strictEqual(f(7, 4), 1);
        var g = R.lPartial(disc, 3, 7);
        assert.strictEqual(g(4), 1);
    });

    it('correctly reports the arity of the new function', function() {
        var f = R.lPartial(disc, 3);
        assert.strictEqual(f.length, 2);
        var g = R.lPartial(disc, 3, 7);
        assert.strictEqual(g.length, 1);
    });
});

describe('rPartial', function() {
    var disc = function(a, b, c) { // note disc(3, 7, 4) => 1
        return b * b - 4 * a * c;
    };

    it('caches the initially supplied right-most parameters in the generated function', function() {
        var f = R.rPartial(disc, 4);
        assert.strictEqual(f(3, 7), 1);
        var g = R.rPartial(disc, 7, 4);
        assert.strictEqual(g(3), 1);
    });

    it('correctly reports the arity of the new function', function() {
        var f = R.rPartial(disc, 4);
        assert.strictEqual(f.length, 2);
        var g = R.rPartial(disc, 7, 4);
        assert.strictEqual(g.length, 1);
    });
});

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
});
