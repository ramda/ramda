var assert = require('assert');

var R = require('..');


describe('init', function() {
    it('returns an empty list for an empty list', function() {
        assert.deepEqual(R.init([]), []);
    });
    it('returns a new list containing all the elements except the last element of a list', function() {
        assert.deepEqual(R.init(['a', 'b', 'c', 'd']), ['a', 'b', 'c']);
    });
    it('throws if applied to null or undefined', function() {
        assert.throws(function() { R.init(null); }, TypeError);
        assert.throws(function() { R.init(undefined); }, TypeError);
        assert.throws(function() { R.init(); }, TypeError);
    });
});
