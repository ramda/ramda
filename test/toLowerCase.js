var assert = require('assert');

var R = require('..');


describe('toLowerCase', function() {
    it('returns the lower-case equivalent of the input string', function() {
        assert.strictEqual(R.toLowerCase('XYZ'), 'xyz');
    });
});
