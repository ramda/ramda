var assert = require('assert');

var R = require('..');


describe('range', function() {
    it('returns list of numbers', function() {
        assert.deepEqual(R.range(0, 5), [0, 1, 2, 3, 4]);
        assert.deepEqual(R.range(4, 7), [4, 5, 6]);
    });

    it('returns the empty list if the first parameter is not larger than the second', function() {
        assert.deepEqual(R.range(7, 3), []);
        assert.deepEqual(R.range(5, 5), []);
    });

    it('is automatically curried', function() {
        var from10 = R.range(10);
        assert.deepEqual(from10(15), [10, 11, 12, 13, 14]);
    });

    it('returns an empty array if from > to', function() {
        var result = R.range(10, 5);
        assert.deepEqual(result, []);
        result.push(5);
        assert.deepEqual(R.range(10, 5), []);
    });
});
