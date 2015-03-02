var assert = require('assert');

var R = require('..');


describe('gt', function() {
    it('reports whether one item is less than another', function() {
        assert(!R.gt(3, 5));
        assert(R.gt(6, 4));
        assert(!R.gt(7.0, 7.0));
        assert(!R.gt('abc', 'xyz'));
        assert(R.gt('abcd', 'abc'));
    });

    it('is curried', function() {
        var lt20 = R.gt(20);
        assert(lt20(10));
        assert(!lt20(20));
        assert(!lt20(25));
    });

    it('behaves right curried when passed `R.__` for its first argument', function() {
        var gt20 = R.gt(R.__, 20);
        assert(!gt20(10));
        assert(!gt20(20));
        assert(gt20(25));
    });
});
