var assert = require('assert');

var R = require('..');


describe('charAt', function() {
    it('returns the character at the nth position of a string', function() {
        assert.strictEqual(R.charAt(8, 'abcdefghijklm'), 'i');
    });

    it('is automatically curried', function() {
        var at8 = R.charAt(8);
        assert.strictEqual(at8('abcdefghijklm'), 'i');
    });
});
