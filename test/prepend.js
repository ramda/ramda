var assert = require('assert');

var R = require('..');


describe('prepend', function() {
    it('adds the element to the beginning of the list', function() {
        assert.deepEqual(R.prepend('x', ['y', 'z']), ['x', 'y', 'z']);
        assert.deepEqual(R.prepend(['a', 'z'], ['x', 'y']), [['a', 'z'], 'x', 'y']);
    });

    it('works on empty list', function() {
        assert.deepEqual(R.prepend(1, []), [1]);
    });

    it('is curried', function() {
        assert.strictEqual(typeof R.prepend(4), 'function');
        assert.deepEqual(R.prepend(4)([3, 2, 1]), [4, 3, 2, 1]);
    });
});
