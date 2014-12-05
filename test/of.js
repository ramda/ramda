var assert = require('assert');

var R = require('..');


describe('of', function() {
    it('returns its argument as an Array', function() {
        assert.deepEqual(R.of(100), [100]);
        assert.deepEqual(R.of([100]), [[100]]);
        assert.deepEqual(R.of(null), [null]);
        assert.deepEqual(R.of(undefined), [undefined]);
        assert.deepEqual(R.of([]), [[]]);
    });
});
