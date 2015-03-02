var assert = require('assert');

var R = require('..');


describe('gte', function() {
    it('reports whether one item is less than another', function() {
        assert(!R.gte(3, 5));
        assert(R.gte(6, 4));
        assert(R.gte(7.0, 7.0));
        assert(!R.gte('abc', 'xyz'));
        assert(R.gte('abcd', 'abc'));
    });

    it('is curried', function() {
        var lte20 = R.gte(20);
        assert(lte20(10));
        assert(lte20(20));
        assert(!lte20(25));
    });

    it('behaves right curried when passed `R.__` for its first argument', function() {
        var gte20 = R.gte(R.__, 20);
        assert(!gte20(10));
        assert(gte20(20));
        assert(gte20(25));
    });
});
