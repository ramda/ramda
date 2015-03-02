var assert = require('assert');

var R = require('..');


describe('take', function() {
    it('takes only the first `n` elements from a list', function() {
        assert.deepEqual(R.take(3, ['a', 'b', 'c', 'd', 'e', 'f', 'g']), ['a', 'b', 'c']);
    });

    it('returns only as many as the array can provide', function() {
        assert.deepEqual(R.take(3, [1, 2]), [1, 2]);
        assert.deepEqual(R.take(3, []), []);
    });

    it('is automatically curried', function() {
        var take3 = R.take(3);
        assert.deepEqual(take3(['a', 'b', 'c', 'd', 'e', 'f', 'g']), ['a', 'b', 'c']);
        assert.deepEqual(take3(['w', 'x', 'y', 'z']), ['w', 'x', 'y']);
    });
});
