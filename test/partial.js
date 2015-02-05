var assert = require('assert');

var R = require('..');


describe('partial', function() {
    var disc = function(a, b, c) { // note disc(3, 7, 4) => 1
        return b * b - 4 * a * c;
    };

    it('caches the initially supplied left-most parameters in the generated function', function() {
        var f = R.partial(disc, 3);
        assert.strictEqual(f(7, 4), 1);
        var g = R.partial(disc, 3, 7);
        assert.strictEqual(g(4), 1);
    });

    it('correctly reports the arity of the new function', function() {
        var f = R.partial(disc, 3);
        assert.strictEqual(f.length, 2);
        var g = R.partial(disc, 3, 7);
        assert.strictEqual(g.length, 1);
    });
});
