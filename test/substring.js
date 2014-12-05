var assert = require('assert');

var R = require('..');


describe('substring', function() {
    it('returns the substring of a string', function() {
        assert.strictEqual(R.substring(2, 5, 'abcdefghijklm'), 'cde');
    });

    it('is automatically curried', function() {
        var from2 = R.substring(2);
        assert.strictEqual(from2(5, 'abcdefghijklm'), 'cde');
        var from2to5 = R.substring(2, 5);
        assert.strictEqual(from2to5('abcdefghijklm'), 'cde');
    });
});
