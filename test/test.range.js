var assert = require("assert");
var R = require("./../ramda");

describe('range', function() {
    var range = R.range;

    it('should return list of numbers', function() {
        assert.deepEqual(range(0, 5), [0, 1, 2, 3, 4]);
        assert.deepEqual(range(4, 7), [4, 5, 6]);
    });

    it('should return the empty list if the first parameter is not larger than the second', function() {
        assert.deepEqual(range(7, 3), []);
        assert.deepEqual(range(5, 5), []);
    });

    it('should be automatically curried', function() {
        var from10 = range(10);
        assert.deepEqual(from10(15), [10, 11, 12, 13, 14]);
    });

    it('should return an empty array if from > to', function() {
         var result = range(10, 5);
         assert.deepEqual(result, []);
         result.push(5);
         assert.deepEqual(range(10, 5), []);
    });
});
