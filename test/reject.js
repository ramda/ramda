var assert = require('assert');

var R = require('..');


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
        assert.throws(R.rejectIndexed, TypeError);
    });
});
