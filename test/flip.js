var assert = require('assert');

var R = require('..');


describe('flip', function() {
    it('returns a function which inverts the first two arguments to the supplied function', function() {
        var f = function(a, b, c) {return a + ' ' + b + ' ' + c;};
        var g = R.flip(f);
        assert.strictEqual(f('a', 'b', 'c'), 'a b c');
        assert.strictEqual(g('a', 'b', 'c'), 'b a c');
    });

    it('returns a curried function', function() {
        var f = function(a, b, c) {return a + ' ' + b + ' ' + c;};
        var g = R.flip(f)('a');
        assert.strictEqual(g('b', 'c'), 'b a c');
    });

    it('produces a function that throws if given no arguments', function() {
        var f = function(x, y) { return x + ' then ' + y; };
        var g = R.flip(f);
        assert.throws(g, TypeError);
    });
});
