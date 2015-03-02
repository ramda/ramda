var assert = require('assert');

var R = require('..');


describe('tail', function() {
    it('returns an empty list for an empty list', function() {
        assert.deepEqual(R.tail([]), []);
    });
    it('returns a new list containing all the elements after the first element of a list', function() {
        assert.deepEqual(R.tail(['a', 'b', 'c', 'd']), ['b', 'c', 'd']);
    });
    it('throws if applied to null or undefined', function() {
        assert.throws(function() { R.tail(null); }, TypeError);
        assert.throws(function() { R.tail(undefined); }, TypeError);
    });
});
