var assert = require("assert");
var Lib = require("./../ramda");

describe('lPartial', function() {
    var lPartial = Lib.lPartial;
    var disc = function(a, b, c) { // note disc(3, 7, 4) => 1
        return b * b - 4 * a * c;
    };

    it('should cache the initially supplied left-most parameters in the generated function', function() {
        var f = lPartial(disc, 3);
        assert.equal(f(7, 4), 1);
        var g = lPartial(disc, 3, 7);
        assert.equal(g(4), 1);
    });

    it('should be aliased by `applyLeft`', function() {
        assert.strictEqual(Lib.applyLeft, lPartial);
    });

    // TODO: what would this take?
    it.skip('should correctly report the arity of the new function', function() {
        var f = lPartial(disc, 3);
        assert.equal(f.length, 2);
        var g = lPartial(disc, 3, 7);
        assert.equal(g.length, 1);
    });
});

describe('rPartial', function() {
    var rPartial = Lib.rPartial;
    var disc = function(a, b, c) { // note disc(3, 7, 4) => 1
        return b * b - 4 * a * c;
    };

    it('should cache the initially supplied right-most parameters in the generated function', function() {
        var f = rPartial(disc, 4);
        assert.equal(f(3, 7), 1);
        var g = rPartial(disc, 7, 4);
        assert.equal(g(3), 1);
    });

    it('should be aliased by `applyRight`', function() {
        assert.strictEqual(Lib.applyRight, rPartial);
    });

    // TODO: what would this take?
    it.skip('should correctly report the arity of the new function', function() {
        var f = rPartial(disc, 4);
        assert.equal(f.length, 2);
        var g = rPartial(disc, 7, 4);
        assert.equal(g.length, 1);
    });
});

describe('curry', function() {
    var curry = Lib.curry;

    it('should curry a single value', function() {
        var f = curry(function(a, b, c, d) {return (a + b * c) / d;}); // f(12, 3, 6, 2) == 15
        var g = f(12);
        assert.equal(g(3, 6, 2), 15);
    });

    it('should curry multiple values', function() {
        var f = curry(function(a, b, c, d) {return (a + b * c) / d;}); // f(12, 3, 6, 2) == 15
        var g = f(12, 3);
        assert.equal(g(6, 2), 15);
        var h = f(12, 3, 6);
        assert.equal(h(2), 15);
    });

    it('should allow further currying of a curried function', function() {
        var f = curry(function(a, b, c, d) {return (a + b * c) / d;}); // f(12, 3, 6, 2) == 15
        var g = f(12);
        assert.equal(g(3, 6, 2), 15);
        var h = g(3);
        assert.equal(h(6, 2), 15);
        var i = g(3, 6);
        assert.equal(i(2), 15);
    });
});
