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
});
