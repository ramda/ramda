var assert = require('assert');

var R = require('..');


describe('append', function() {
    it('adds the element to the end of the list', function() {
        assert.deepEqual(R.append('z', ['x', 'y']), ['x', 'y', 'z']);
        assert.deepEqual(R.append(['a', 'z'], ['x', 'y']), ['x', 'y', ['a', 'z']]);
    });

    it('works on empty list', function() {
        assert.deepEqual(R.append(1, []), [1]);
    });

    it('is curried', function() {
        assert.strictEqual(typeof R.append(4), 'function');
        assert.deepEqual(R.append(1)([4, 3, 2]), [4, 3, 2, 1]);
    });
});
