var assert = require("assert");
var Lib = require("./../ramda");

describe('filter', function() {
    var filter = Lib.filter;
    var even = function(x) {return x % 2 === 0;};

    it('reduces an array to those matching a filter', function() {
        assert.deepEqual(filter(even, [1, 2, 3, 4, 5]), [2, 4]);
    });

    it('should be automatically curried', function() {
        var onlyEven = filter(even);
        assert.deepEqual(onlyEven([1, 2, 3, 4, 5, 6, 7]), [2, 4, 6]);
    });
});

describe('filter.idx', function() {
    var filter = Lib.filter;
    var even = function(x) {return x % 2 === 0;};
    var everyOther = function(val, idx) {return idx % 2 === 0;};
    var lastTwo = function(val, idx, list) {return list.length - idx < 3;};

    it('works just like a normal filter', function() {
        assert.deepEqual(filter.idx(even, [1, 2, 3, 4, 5]), [2, 4]);
    });

    it('passes the index as a second parameter to the predicate', function() {
        assert.deepEqual(filter.idx(everyOther, [8, 6, 7, 5, 3, 0, 9]), [8, 7, 3, 9]);
    });

    it('passes the entire list as a third parameter to the predicate', function() {
        assert.deepEqual(filter.idx(lastTwo, [8, 6, 7, 5, 3, 0, 9]), [0, 9]);
    });

    it('should be automatically curried', function() {
        var everyOtherPosition = filter(everyOther);
        assert.deepEqual(everyOtherPosition([8, 6, 7, 5, 3, 0, 9]), [8, 7, 3, 9]);
    });
});

describe('reject', function() {
    var reject = Lib.reject;
    var even = function(x) {return x % 2 === 0;};

    it('reduces an array to those not matching a filter', function() {
        assert.deepEqual(reject(even, [1, 2, 3, 4, 5]), [1, 3, 5]);
    });

    it('should be automatically curried', function() {
        var odd = reject(even);
        assert.deepEqual(odd([1, 2, 3,4, 5, 6, 7]), [1, 3, 5, 7]);
    });
});

describe('reject.idx', function() {
    var reject = Lib.reject;
    var even = function(x) {return x % 2 === 0;};
    var everyOther = function(val, idx) {return idx % 2 === 0;};
    var lastTwo = function(val, idx, list) {return list.length - idx < 3;};

    it('works just like a normal reject', function() {
        assert.deepEqual(reject.idx(even, [1, 2, 3, 4, 5]), [1, 3, 5]);
    });

    it('passes the index as a second parameter to the predicate', function() {
        assert.deepEqual(reject.idx(everyOther, [8, 6, 7, 5, 3, 0, 9]), [6, 5, 0]);
    });

    it('passes the entire list as a third parameter to the predicate', function() {
        assert.deepEqual(reject.idx(lastTwo, [8, 6, 7, 5, 3, 0, 9]), [8, 6, 7, 5, 3]);
    });

    it('should be automatically curried', function() {
        var everyOtherPosition = reject.idx(everyOther);
        assert.deepEqual(everyOtherPosition([8, 6, 7, 5, 3, 0, 9]), [6, 5, 0]);
    });
});

describe('take', function() {
    var take = Lib.take;

    it('should take only the first `n` elements from a list', function() {
        assert.deepEqual(take(3, ['a', 'b', 'c', 'd', 'e', 'f', 'g']), ['a', 'b', 'c']);
    });

    it('should be automatically curried', function() {
        var take3 = take(3);
        assert.deepEqual(take3(['a', 'b', 'c', 'd', 'e', 'f', 'g']), ['a', 'b', 'c']);
        assert.deepEqual(take3(['w', 'x', 'y', 'z']), ['w', 'x', 'y']);
    });
});

describe('takeWhile', function() {
    var takeWhile = Lib.takeWhile;

    it('should continue taking elements while the function reports `true`', function() {
        assert.deepEqual(takeWhile(function(x) {return x != 5;}, [1, 3, 5, 7, 9]), [1, 3]);
    });

    it('should be automatically curried', function() {
        var takeUntil7 = takeWhile(function(x) {return x != 7;});
        assert.deepEqual(takeUntil7([1, 3, 5, 7, 9]), [1, 3, 5]);
        assert.deepEqual(takeUntil7([2, 4, 6, 8, 10]), [2, 4, 6, 8, 10]);
    });
});

describe('skip', function() {
    var skip = Lib.skip;

    it('should skip the first `n` elements from a list, returning the remainder', function() {
        assert.deepEqual(skip(3, ['a', 'b', 'c', 'd', 'e', 'f', 'g']), ['d', 'e', 'f', 'g']);
    });

    it('should be automatically curried', function() {
        var skip2 = skip(2);
        assert.deepEqual(skip2(['a', 'b', 'c', 'd', 'e']), ['c', 'd', 'e']);
        assert.deepEqual(skip2(['x', 'y', 'z']), ['z']);
    });

    it('should be aliased by `drop`', function() {
        assert.deepEqual(Lib.drop(1, ['a', 'b', 'c']), ['b', 'c']);
        assert.strictEqual(Lib.drop, skip);
    });
});

describe('skipUntil', function() {
    var skipUntil = Lib.skipUntil;

    it('should continue taking elements while the function reports `true`', function() {
        assert.deepEqual(skipUntil(function(x) {return x === 5;}, [1, 3, 5, 7, 9]), [5, 7, 9]);
    });

    it('should be automatically curried', function() {
        var skipUntil7 = skipUntil(function(x) {return x === 7;});
        assert.deepEqual(skipUntil7([1, 3, 5, 7, 9]), [7, 9]);
        assert.deepEqual(skipUntil7([2, 4, 6, 8, 10]), []);
    });
});

