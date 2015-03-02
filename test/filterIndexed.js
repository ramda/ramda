var assert = require('assert');

var R = require('..');


describe('filterIndexed', function() {
    var even = function(x) {return x % 2 === 0;};
    var everyOther = function(val, idx) {return idx % 2 === 0;};
    var lastTwo = function(val, idx, list) {return list.length - idx < 3;};

    it('works just like a normal filter', function() {
        assert.deepEqual(R.filterIndexed(even, [1, 2, 3, 4, 5]), [2, 4]);
    });

    it('passes the index as a second parameter to the predicate', function() {
        assert.deepEqual(R.filterIndexed(everyOther, [8, 6, 7, 5, 3, 0, 9]), [8, 7, 3, 9]);
    });

    it('passes the entire list as a third parameter to the predicate', function() {
        assert.deepEqual(R.filterIndexed(lastTwo, [8, 6, 7, 5, 3, 0, 9]), [0, 9]);
    });

    it('returns an empty array if no element matches', function() {
        assert.deepEqual(R.filterIndexed(function(x) { return x > 100; }, [1, 9, 99]), []);
    });

    it('returns an empty array if asked to filter an empty array', function() {
        assert.deepEqual(R.filterIndexed(function(x) { return x > 100; }, []), []);
    });

    it('is automatically curried', function() {
        var everyOtherPosition = R.filterIndexed(everyOther);
        assert.deepEqual(everyOtherPosition([8, 6, 7, 5, 3, 0, 9]), [8, 7, 3, 9]);
    });
});
