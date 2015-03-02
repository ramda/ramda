var assert = require('assert');

var R = require('..');


describe('and', function() {
    it('combines two boolean-returning functions into one', function() {
        var even = function(x) {return x % 2 === 0;};
        var gt10 = function(x) {return x > 10;};
        var f = R.and(even, gt10);
        assert.strictEqual(f(8), false);
        assert.strictEqual(f(13), false);
        assert.strictEqual(f(14), true);
    });

    it('accepts functions that take multiple parameters', function() {
        var between = function(a, b, c) {return a < b && b < c;};
        var total20 = function(a, b, c) {return a + b + c === 20;};
        var f = R.and(between, total20);
        assert.strictEqual(f(4, 5, 11), true);
        assert.strictEqual(f(12, 2, 6), false);
        assert.strictEqual(f(5, 6, 15), false);
    });

    it('does not evaluate the second expression if the first one is false', function() {
        var F = function() { return false; };
        var Z = function() { effect = 'Z got evaluated'; };
        var effect = 'not evaluated';
        R.and(F, Z);
        assert.strictEqual(effect, 'not evaluated');
    });

    it('is curried', function() {
        var even = function(x) {return x % 2 === 0;};
        var gt10 = function(x) {return x > 10;};
        var evenAnd = R.and(even);
        assert.strictEqual(typeof evenAnd(gt10), 'function');
        assert.strictEqual(evenAnd(gt10)(11), false);
        assert.strictEqual(evenAnd(gt10)(12), true);
    });
});
