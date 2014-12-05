var assert = require('assert');

var R = require('..');


describe('substringFrom', function() {
    it('returns the trailing substring of a string', function() {
        assert.strictEqual(R.substringFrom(8, 'abcdefghijklm'), 'ijklm');
    });

    it('is automatically curried', function() {
        var after8 = R.substringFrom(8);
        assert.strictEqual(after8('abcdefghijklm'), 'ijklm');
    });
});
