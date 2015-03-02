var assert = require('assert');

var R = require('..');


describe('appendTo', function() {
    it('adds the element to the end of the list', function() {
        assert.deepEqual(R.appendTo([1, 2, 3], 4), [1, 2, 3, 4]);
        assert.deepEqual(R.appendTo([1, 2, 3], [4, 5, 6]), [1, 2, 3, [4, 5, 6]]);
    });

    it('works on empty list', function() {
        assert.deepEqual(R.appendTo([], 1), [1]);
    });

    it('is curried', function() {
        assert.strictEqual(typeof R.appendTo([]), 'function');
        assert.deepEqual(R.appendTo([4, 3, 2])(1), [4, 3, 2, 1]);
    });
});
