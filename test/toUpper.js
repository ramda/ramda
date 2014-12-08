var assert = require('assert');

var R = require('..');


describe('toUpper', function() {
    it('returns the upper-case equivalent of the input string', function() {
        assert.strictEqual(R.toUpper('abc'), 'ABC');
    });
});
