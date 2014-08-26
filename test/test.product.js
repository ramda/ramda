var assert = require('assert');
var R = require('..');

describe('xprod', function() {
    var a = [1, 2], b = ['a', 'b', 'c'];

    it('returns an empty list if either input list is empty', function() {
        assert.deepEqual(R.xprod([], [1, 2, 3]), []);
        assert.deepEqual(R.xprod([1, 2, 3], []), []);
    });

    it('should create the collection of all cross-product pairs of its parameters', function() {
        assert.deepEqual(R.xprod(a, b), [[1, 'a'], [1, 'b'], [1, 'c'], [2, 'a'], [2, 'b'], [2, 'c']]);
    });

    it('should be automatically curried', function() {
        var something = R.xprod(b);
        assert.deepEqual(something(a), [['a', 1], ['a', 2], ['b', 1], ['b', 2], ['c', 1], ['c', 2]]);
    });

    it('should correctly report the arity of curried versions', function() {
        var something = R.xprod(a);
        assert.equal(something.length, 1);
    });
});

describe('xprodWith', function() {
    var concat = function(x, y) {return '' + x + y;};
    var a = [1, 2], b = ['a', 'b', 'c'];

    it('returns an empty list if either input list is empty', function() {
        assert.deepEqual(R.xprodWith(concat, [], [1, 2, 3]), []);
        assert.deepEqual(R.xprodWith(concat, [1, 2, 3], []), []);
    });

    it('should create the collection of all cross-product pairs of its parameters', function() {
        assert.deepEqual(R.xprodWith(concat, a, b), ['1a', '1b', '1c', '2a', '2b', '2c']);
    });

    it('should be automatically curried', function() {
        var f1 = R.xprodWith(concat);
        assert.deepEqual(f1(b, a), ['a1', 'a2', 'b1', 'b2', 'c1', 'c2']);
        var f2 = f1(a);
        assert.deepEqual(f2(b), ['1a', '1b', '1c', '2a', '2b', '2c']);
    });

    it('should correctly report the arity of curried versions', function() {
        var something = R.xprodWith(a);
        assert.equal(something.length, 2);
    });
});
