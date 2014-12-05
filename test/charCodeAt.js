var assert = require('assert');

var R = require('..');


describe('charCodeAt', function() {
    it('returns the ascii character at the nth position of a string', function() {
        assert.strictEqual(R.charCodeAt(8, 'abcdefghijklm'), 105);  // 'a' ~ 97, 'b' ~ 98, ... 'i' ~ 105
    });

    it('is automatically curried', function() {
        var at8 = R.charCodeAt(8);
        assert.strictEqual(at8('abcdefghijklm'), 105);
    });
});
