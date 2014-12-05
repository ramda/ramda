var assert = require('assert');

var R = require('..');


describe('drop', function() {
    it('skips the first `n` elements from a list, returning the remainder', function() {
        assert.deepEqual(R.drop(3, ['a', 'b', 'c', 'd', 'e', 'f', 'g']), ['d', 'e', 'f', 'g']);
    });

    it('returns an empty array if `n` is too large', function() {
        assert.deepEqual(R.drop(20, ['a', 'b', 'c', 'd', 'e', 'f', 'g']), []);
    });

    it('is automatically curried', function() {
        var drop2 = R.drop(2);
        assert.deepEqual(drop2(['a', 'b', 'c', 'd', 'e']), ['c', 'd', 'e']);
        assert.deepEqual(drop2(['x', 'y', 'z']), ['z']);
    });
});
