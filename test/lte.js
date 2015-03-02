var assert = require('assert');

var R = require('..');


describe('lte', function() {
    it('reports whether one item is less than another', function() {
        assert(R.lte(3, 5));
        assert(!R.lte(6, 4));
        assert(R.lte(7.0, 7.0));
        assert(R.lte('abc', 'xyz'));
        assert(!R.lte('abcd', 'abc'));
    });

    it('is curried', function() {
        var gte20 = R.lte(20);
        assert(!gte20(10));
        assert(gte20(20));
        assert(gte20(25));
    });
});
