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
        var fbb = ['foo', 'bar', 'baz'];
        assert(typeof R.contains(R.__) === 'function');
        assert(typeof R.contains(R.__)('bar') === 'function');
        assert(R.contains(R.__)(fbb)('bar'));
        assert(R.contains(R.__, fbb)('bar'));
        assert(R.contains(R.__)(fbb, 'bar'));
    });

    it('throws on zero arguments', function() {
        assert.throws(R.contains, TypeError);
    });
});
