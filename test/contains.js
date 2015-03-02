var assert = require('assert');

var R = require('..');


describe('contains', function() {
    it('returns true if an element is in a list', function() {
        assert.strictEqual(R.contains(7, [1, 2, 3, 9, 8, 7, 100, 200, 300]), true);
    });

    it('returns false if an element is not in a list', function() {
        assert.strictEqual(R.contains(99, [1, 2, 3, 9, 8, 7, 100, 200, 300]), false);
    });

    it('returns false for the empty list', function() {
        assert.strictEqual(R.contains(1, []), false);
    });

    it('is curried', function() {
        assert.strictEqual(typeof R.contains(7), 'function');
        assert.strictEqual(R.contains(7)([1, 2, 3]), false);
        assert.strictEqual(R.contains(7)([1, 2, 7, 3]), true);
    });

    it('is curried like a binary operator, that accepts an inital placeholder', function() {
        var isDigit = R.contains(R.__, ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);
        assert.strictEqual(typeof isDigit, 'function');
        assert.strictEqual(isDigit('0'), true);
        assert.strictEqual(isDigit('1'), true);
        assert.strictEqual(isDigit('x'), false);
    });
});
