var assert = require('assert');

var R = require('..');


describe('min', function() {
    it('calculates the smallest value of a list', function() {
        assert.strictEqual(R.min([2, 1, 2, 8, 6, 7, 5, 3, 0, 9]), 0);
        assert.strictEqual(R.min([7, 22, 11, 34, 17, 52, 26, 13, 40, 20, 10, 5, 16, 8, 4, 2, 1]), 1);
    });

    it('accepts negative numbers, decimals, and even strings', function() {
        assert.strictEqual(R.min([-6, -2, -4.3, -1.1, -5]), -6);
        assert.strictEqual(R.min([7, '22', 11, 34, 17, '52', 26, 13, 40, 20, '10', 5, 16, 8, 4, '2', '1']), 1);
    });

    it('finds min in any position', function() {
        assert.strictEqual(R.min([0, 2, 1, 3]), 0);
        assert.strictEqual(R.min([3, 0, 2, 1]), 0);
        assert.strictEqual(R.min([3, 1, 0, 2]), 0);
        assert.strictEqual(R.min([3, 1, 2, 0]), 0);
    });

    it('returns Infinity for an empty list', function() {
        assert.strictEqual(R.min([]), Infinity);
    });

    it('returns a number', function() {
        assert.strictEqual(R.min(['4', '1', '100', '10', '2']), 1);
    });
});
