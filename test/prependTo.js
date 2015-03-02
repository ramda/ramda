var assert = require('assert');

var R = require('..');


describe('prependTo', function() {
    it('adds the element to the beginning of the list', function() {
        assert.deepEqual(R.prependTo([4, 5, 6], 3), [3, 4, 5, 6]);
        assert.deepEqual(R.prependTo([4, 5, 6], [1, 2, 3]), [[1, 2, 3], 4, 5, 6]);
    });

    it('works on empty list', function() {
        assert.deepEqual(R.prependTo([], 1), [1]);
    });

    it('is curried', function() {
        assert.strictEqual(typeof R.prependTo([]), 'function');
        assert.deepEqual(R.prependTo([3, 2, 1])(4), [4, 3, 2, 1]);
    });
});
