var assert = require('assert');

var R = require('..');


describe('toUpperCase', function() {
    it('returns the upper-case equivalent of the input string', function() {
        assert.strictEqual(R.toUpperCase('abc'), 'ABC');
    });
});
