var assert = require('assert');

var R = require('..');


describe('lt', function() {
    it('reports whether one item is less than another', function() {
        assert(R.lt(3, 5));
        assert(!R.lt(6, 4));
        assert(!R.lt(7.0, 7.0));
        assert(R.lt('abc', 'xyz'));
        assert(!R.lt('abcd', 'abc'));
    });

    it('is curried', function() {
        var gt5 = R.lt(5);
        assert(gt5(10));
        assert(!gt5(5));
        assert(!gt5(3));
    });

    it('behaves right curried when passed `R.__` for its first argument', function() {
        var lt5 = R.lt(R.__, 5);
        assert(!lt5(10));
        assert(!lt5(5));
        assert(lt5(3));
    });
});
