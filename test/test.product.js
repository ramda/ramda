var assert = require('assert');
var R = require('..');

describe('xprod', function() {
    var a = [1, 2], b = ['a', 'b', 'c'];

    it('returns an empty list if either input list is empty', function() {
        assert.deepEqual(R.xprod([], [1, 2, 3]), []);
        assert.deepEqual(R.xprod([1, 2, 3], []), []);
    });

    it('creates the collection of all cross-product pairs of its parameters', function() {
        assert.deepEqual(R.xprod(a, b), [[1, 'a'], [1, 'b'], [1, 'c'], [2, 'a'], [2, 'b'], [2, 'c']]);
    });

    it('is automatically curried', function() {
        var something = R.xprod(b);
        assert.deepEqual(something(a), [['a', 1], ['a', 2], ['b', 1], ['b', 2], ['c', 1], ['c', 2]]);
    });

    it('correctly reports the arity of curried versions', function() {
        var something = R.xprod(a);
        assert.equal(something.length, 1);
    });
});
