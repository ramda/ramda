var assert = require('assert');

var R = require('..');


describe('uniq', function() {
    it('returns a set from any array (i.e. purges duplicate elements)', function() {
        var list = [1, 2, 3, 1, 2, 3, 1, 2, 3];
        assert.deepEqual(R.uniq(list), [1, 2, 3]);
    });

    it('keeps elements from the left', function() {
        assert.deepEqual(R.uniq([1, 2, 3, 4, 1]), [1, 2, 3, 4]);
    });

    it('returns an empty array for an empty array', function() {
        assert.deepEqual(R.uniq([]), []);
    });
});
