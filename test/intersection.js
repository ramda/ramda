var assert = require('assert');

var R = require('..');


describe('intersection', function() {
    var M = [1, 2, 3, 4];
    var M2 = [1, 2, 3, 4, 1, 2, 3, 4];
    var N = [3, 4, 5, 6];
    var N2 = [3, 3, 4, 4, 5, 5, 6, 6];
    var Mo = [{a: 1}, {a: 2}, {a: 3}, {a: 4}];
    var No = [{a: 3}, {a: 4}, {a: 5}, {a: 6}];
    it('combines two lists into the set of common elements', function() {
        assert.deepEqual(R.intersection(M, N), [3, 4]);
    });

    it('does not allow duplicates in the output even if the input lists had duplicates', function() {
        assert.deepEqual(R.intersection(M2, N2), [3, 4]);
    });

    it('does not work for non-primitives (use `intersectionWith`)', function() {
        assert.strictEqual(R.intersection(Mo, No).length, 0);
    });
});
