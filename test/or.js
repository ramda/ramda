var assert = require('assert');

var R = require('..');


describe('or', function() {
    it('combines two boolean-returning functions into one', function() {
        var even = function(x) {return x % 2 === 0;};
        var gt10 = function(x) {return x > 10;};
        var f = R.or(even, gt10);
        assert.strictEqual(f(8), true);
        assert.strictEqual(f(13), true);
        assert.strictEqual(f(7), false);
    });

    it('accepts functions that take multiple parameters', function() {
        var between = function(a, b, c) {return a < b && b < c;};
        var total20 = function(a, b, c) {return a + b + c === 20;};
        var f = R.or(between, total20);
        assert.strictEqual(f(4, 5, 8), true);
        assert.strictEqual(f(12, 2, 6), true);
        assert.strictEqual(f(7, 5, 1), false);
    });

    it('does not evaluate the second expression if the first one is true', function() {
        var T = function() { return true; };
        var Z = function() { effect = 'Z got evaluated'; };
        var effect = 'not evaluated';
        R.or(T, Z);
        assert.strictEqual(effect, 'not evaluated');
    });

    it('is curried', function() {
        var even = function(x) {return x % 2 === 0;};
        var gt10 = function(x) {return x > 10;};
        var evenOr = R.or(even);
        assert.strictEqual(typeof evenOr(gt10), 'function');
        assert.strictEqual(evenOr(gt10)(11), true);
        assert.strictEqual(evenOr(gt10)(9), false);
    });
});
