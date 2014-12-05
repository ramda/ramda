var assert = require('assert');

var R = require('..');


describe('zip', function() {
    it('returns an array of "tuples"', function() {
        var a = [1, 2, 3], b = [100, 200, 300];
        assert.deepEqual(R.zip(a, b), [[1, 100], [2, 200], [3, 300]]);
    });

    it('returns a list as long as the shorter of the lists input', function() {
        var a = [1, 2, 3], b = [100, 200, 300, 400], c = [10, 20];
        assert.deepEqual(R.zip(a, b), [[1, 100], [2, 200], [3, 300]]);
        assert.deepEqual(R.zip(a, c), [[1, 10], [2, 20]]);
    });
});
