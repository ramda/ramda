var assert = require('assert');
var R = require('..');

describe('filter', function() {
    var even = function(x) {return x % 2 === 0;};

    it('reduces an array to those matching a filter', function() {
        assert.deepEqual(R.filter(even, [1, 2, 3, 4, 5]), [2, 4]);
    });

    it('returns an empty array if no element matches', function() {
        assert.deepEqual(R.filter(function(x) { return x > 100; }, [1, 9, 99]), []);
    });

    it('returns an empty array if asked to filter an empty array', function() {
        assert.deepEqual(R.filter(function(x) { return x > 100; }, []), []);
    });

    it('dispatches to passed-in non-Array object with a `filter` method', function() {
        var f = {filter: function(f) { return f('called f.filter'); }};
        assert.equal(R.filter(function(s) { return s; }, f), 'called f.filter');
    });

    it('is automatically curried', function() {
        var onlyEven = R.filter(even);
        assert.deepEqual(onlyEven([1, 2, 3, 4, 5, 6, 7]), [2, 4, 6]);
    });

    it('throws on zero arguments', function() {
        assert.throws(R.filter, TypeError);
    });
});

describe('filter.idx', function() {
    var even = function(x) {return x % 2 === 0;};
    var everyOther = function(val, idx) {return idx % 2 === 0;};
    var lastTwo = function(val, idx, list) {return list.length - idx < 3;};

    it('works just like a normal filter', function() {
        assert.deepEqual(R.filter.idx(even, [1, 2, 3, 4, 5]), [2, 4]);
    });

    it('passes the index as a second parameter to the predicate', function() {
        assert.deepEqual(R.filter.idx(everyOther, [8, 6, 7, 5, 3, 0, 9]), [8, 7, 3, 9]);
    });

    it('passes the entire list as a third parameter to the predicate', function() {
        assert.deepEqual(R.filter.idx(lastTwo, [8, 6, 7, 5, 3, 0, 9]), [0, 9]);
    });

    it('returns an empty array if no element matches', function() {
        assert.deepEqual(R.filter.idx(function(x) { return x > 100; }, [1, 9, 99]), []);
    });

    it('returns an empty array if asked to filter an empty array', function() {
        assert.deepEqual(R.filter.idx(function(x) { return x > 100; }, []), []);
    });

    it('is automatically curried', function() {
        var everyOtherPosition = R.filter.idx(everyOther);
        assert.deepEqual(everyOtherPosition([8, 6, 7, 5, 3, 0, 9]), [8, 7, 3, 9]);
    });

    it('throws on zero arguments', function() {
        assert.throws(R.filter.idx, TypeError);
    });
});

describe('reject', function() {
    var even = function(x) {return x % 2 === 0;};

    it('reduces an array to those not matching a filter', function() {
        assert.deepEqual(R.reject(even, [1, 2, 3, 4, 5]), [1, 3, 5]);
    });

    it('returns an empty array if no element matches', function() {
        assert.deepEqual(R.reject(function(x) { return x < 100; }, [1, 9, 99]), []);
    });

    it('returns an empty array if asked to filter an empty array', function() {
        assert.deepEqual(R.reject(function(x) { return x > 100; }, []), []);
    });

    it('returns an empty array if no element matches', function() {
        assert.deepEqual(R.reject(function(x) { return x < 100; }, [1, 9, 99]), []);
    });

    it('returns an empty array if asked to filter an empty array', function() {
        assert.deepEqual(R.reject(function(x) { return x > 100; }, []), []);
    });

    it('is automatically curried', function() {
        var odd = R.reject(even);
        assert.deepEqual(odd([1, 2, 3, 4, 5, 6, 7]), [1, 3, 5, 7]);
    });

    it('throws on zero arguments', function() {
        assert.throws(R.reject.idx, TypeError);
    });
});

describe('reject.idx', function() {
    var even = function(x) {return x % 2 === 0;};
    var everyOther = function(val, idx) {return idx % 2 === 0;};
    var lastTwo = function(val, idx, list) {return list.length - idx < 3;};

    it('works just like a normal reject', function() {
        assert.deepEqual(R.reject.idx(even, [1, 2, 3, 4, 5]), [1, 3, 5]);
    });

    it('passes the index as a second parameter to the predicate', function() {
        assert.deepEqual(R.reject.idx(everyOther, [8, 6, 7, 5, 3, 0, 9]), [6, 5, 0]);
    });

    it('passes the entire list as a third parameter to the predicate', function() {
        assert.deepEqual(R.reject.idx(lastTwo, [8, 6, 7, 5, 3, 0, 9]), [8, 6, 7, 5, 3]);
    });

    it('returns an empty array if no element matches', function() {
        assert.deepEqual(R.reject.idx(function(x) { return x < 100; }, [1, 9, 99]), []);
    });

    it('returns an empty array if asked to filter an empty array', function() {
        assert.deepEqual(R.reject.idx(function(x) { return x > 100; }, []), []);
    });

    it('is automatically curried', function() {
        var everyOtherPosition = R.reject.idx(everyOther);
        assert.deepEqual(everyOtherPosition([8, 6, 7, 5, 3, 0, 9]), [6, 5, 0]);
    });

    it('throws on zero arguments', function() {
        assert.throws(R.reject.idx, TypeError);
    });
});

describe('take', function() {
    it('takes only the first `n` elements from a list', function() {
        assert.deepEqual(R.take(3, ['a', 'b', 'c', 'd', 'e', 'f', 'g']), ['a', 'b', 'c']);
    });

    it('returns only as many as the array can provide', function() {
        assert.deepEqual(R.take(3, [1, 2]), [1, 2]);
        assert.deepEqual(R.take(3, []), []);
    });

    it('is automatically curried', function() {
        var take3 = R.take(3);
        assert.deepEqual(take3(['a', 'b', 'c', 'd', 'e', 'f', 'g']), ['a', 'b', 'c']);
        assert.deepEqual(take3(['w', 'x', 'y', 'z']), ['w', 'x', 'y']);
    });

    it('throws on zero arguments', function() {
        assert.throws(R.take, TypeError);
    });
});

describe('takeWhile', function() {
    it('continues taking elements while the function reports `true`', function() {
        assert.deepEqual(R.takeWhile(function(x) {return x != 5;}, [1, 3, 5, 7, 9]), [1, 3]);
    });

    it('starts at the right arg and acknowledges undefined', function() {
        assert.deepEqual(R.takeWhile(function() { assert.ok(false); }, []), []);
        assert.deepEqual(R.takeWhile(function(x) {return x !== void 0;}, [1, 3, void 0, 5, 7]), [1, 3]);
    });

    it('is automatically curried', function() {
        var takeUntil7 = R.takeWhile(function(x) {return x != 7;});
        assert.deepEqual(takeUntil7([1, 3, 5, 7, 9]), [1, 3, 5]);
        assert.deepEqual(takeUntil7([2, 4, 6, 8, 10]), [2, 4, 6, 8, 10]);
    });
});

describe('skip', function() {
    it('skips the first `n` elements from a list, returning the remainder', function() {
        assert.deepEqual(R.skip(3, ['a', 'b', 'c', 'd', 'e', 'f', 'g']), ['d', 'e', 'f', 'g']);
    });

    it('returns an empty array if `n` is too large', function() {
        assert.deepEqual(R.skip(20, ['a', 'b', 'c', 'd', 'e', 'f', 'g']), []);
    });

    it('is automatically curried', function() {
        var skip2 = R.skip(2);
        assert.deepEqual(skip2(['a', 'b', 'c', 'd', 'e']), ['c', 'd', 'e']);
        assert.deepEqual(skip2(['x', 'y', 'z']), ['z']);
    });
});

describe('skipUntil', function() {
    it('continues taking elements while the function reports `true`', function() {
        assert.deepEqual(R.skipUntil(function(x) {return x === 5;}, [1, 3, 5, 7, 9]), [5, 7, 9]);
    });

    it('returns an empty list for an ampty list', function() {
        assert.deepEqual(R.skipUntil(function() { return false; }, []), []);
        assert.deepEqual(R.skipUntil(function() { return true; }, []), []);
    });

    it('starts at the right arg and acknowledges undefined', function() {
        var sublist = R.skipUntil(function(x) {return x === void 0;}, [1, 3, void 0, 5, 7]);
        assert.equal(sublist.length, 3);
        assert.equal(sublist[0], void 0);
        assert.equal(sublist[1], 5);
        assert.equal(sublist[2], 7);
    });

    it('is automatically curried', function() {
        var skipUntil7 = R.skipUntil(function(x) {return x === 7;});
        assert.deepEqual(skipUntil7([1, 3, 5, 7, 9]), [7, 9]);
        assert.deepEqual(skipUntil7([2, 4, 6, 8, 10]), []);
    });
});
