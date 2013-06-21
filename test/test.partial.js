var assert = require("assert");
var lib = require("./../ramda");

describe('lPartial', function() {
    var lPartial = lib.lPartial;
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
        assert.strictEqual(lib.applyLeft, lPartial);
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
    var rPartial = lib.rPartial;
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
        assert.strictEqual(lib.applyRight, rPartial);
    });

    // TODO: what would this take?
    it.skip('should correctly report the arity of the new function', function() {
        var f = rPartial(disc, 4);
        assert.equal(f.length, 2);
        var g = rPartial(disc, 7, 4);
        assert.equal(g.length, 1);
    });
});
