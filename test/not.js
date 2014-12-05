var assert = require('assert');

var R = require('..');


describe('not', function() {
    it('creates boolean-returning function that reverses another', function() {
        var even = function(x) {return x % 2 === 0;};
        var f = R.not(even);
        assert.strictEqual(f(8), false);
        assert.strictEqual(f(13), true);
    });

    it('accepts a function that take multiple parameters', function() {
        var between = function(a, b, c) {return a < b && b < c;};
        var f = R.not(between);
        assert.strictEqual(f(4, 5, 11), false);
        assert.strictEqual(f(12, 2, 6), true);
    });
});
