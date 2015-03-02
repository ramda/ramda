var assert = require('assert');

var R = require('..');


describe('head', function() {
    it('returns undefined for an empty list', function() {
        assert.strictEqual(typeof(R.head([])),  'undefined');
    });
    it('returns the first element of a list', function() {
        assert.strictEqual(R.head(['a', 'b', 'c', 'd']), 'a');
    });
    it('throws if applied to null or undefined', function() {
        assert.throws(function() { R.head(null); }, TypeError);
        assert.throws(function() { R.head(undefined); }, TypeError);
    });
});
