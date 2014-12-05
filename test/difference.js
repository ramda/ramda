var assert = require('assert');

var R = require('..');


describe('difference', function() {
    var M = [1, 2, 3, 4];
    var M2 = [1, 2, 3, 4, 1, 2, 3, 4];
    var N = [3, 4, 5, 6];
    var N2 = [3, 3, 4, 4, 5, 5, 6, 6];
    var Z = [3, 4, 5, 6, 10];
    var Z2 = [1, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 8];
    var Mo = [{a: 1}, {a: 2}, {a: 3}, {a: 4}];
    var No = [{a: 3}, {a: 4}, {a: 5}, {a: 6}];
    it('finds the set of all elements in the first list not contained in the second', function() {
        assert.deepEqual(R.difference(M, N), [1, 2]);
    });

    it('does not allow duplicates in the output even if the input lists had duplicates', function() {
        assert.deepEqual(R.difference(M2, N2), [1, 2]);
    });

    it('does not work for non-primitives (use `differenceWith`)', function() {
        assert.strictEqual(R.difference(Mo, No).length, 4);
    });

    it('works for arrays of different lengths', function() {
        assert.deepEqual(R.difference(Z, Z2), [10]);
        assert.deepEqual(R.difference(Z2, Z), [1, 2, 7, 8]);
    });

    it('returns an empty array if there are no different elements', function() {
        assert.deepEqual(R.difference(M2, M), []);
        assert.deepEqual(R.difference(M, M2), []);
        assert.deepEqual(R.difference([], M2), []);
    });

    it('is curried', function() {
        assert(typeof R.difference([1, 2, 3]) === 'function');
        assert.deepEqual(R.difference([1, 2, 3])([1, 3]), [2]);
    });
});
