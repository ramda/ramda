var assert = require('assert');

var R = require('..');


describe('max', function() {
    it('calculates the largest value of a list', function() {
        assert.strictEqual(R.max([2, 1, 2, 8, 6, 7, 5, 3, 0, 9]), 9);
        assert.strictEqual(R.max([7, 22, 11, 34, 17, 52, 26, 13, 40, 20, 10, 5, 16, 8, 4, 2, 1]), 52);
    });

    it('accepts negative numbers, decimals, and even strings', function() {
        assert.strictEqual(R.max([-6, -2, -4.3, -1.1, -5]), -1.1);
        assert.strictEqual(R.max([7, '22', 11, 34, 17, '52', 26, 13, 40, 20, '10', 5, 16, 8, 4, '2', '1']), 52);
    });

    it('finds max in any position', function() {
        assert.strictEqual(R.max([6, 2, 1, 3]), 6);
        assert.strictEqual(R.max([3, 6, 2, 1]), 6);
        assert.strictEqual(R.max([3, 1, 6, 2]), 6);
        assert.strictEqual(R.max([3, 1, 2, 6]), 6);
    });

    it('returns -Infinity for an empty list', function() {
        assert.strictEqual(R.max([]), -Infinity);
    });

    it('returns a number', function() {
        assert.strictEqual(R.max(['4', '1', '100', '10', '2']), 100);
    });
});
