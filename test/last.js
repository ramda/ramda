var assert = require('assert');

var R = require('..');


describe('last', function() {
    it('returns undefined for an empty list', function() {
        assert.strictEqual(typeof(R.last([])),  'undefined');
    });
    it('returns the first element of a list', function() {
        assert.strictEqual(R.last(['a', 'b', 'c', 'd']), 'd');
    });
    it('throws if applied to null or undefined', function() {
        assert.throws(function() { R.last(null); }, TypeError);
        assert.throws(function() { R.last(undefined); }, TypeError);
    });
});
