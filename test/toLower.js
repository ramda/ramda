var assert = require('assert');

var R = require('..');


describe('toLower', function() {
    it('returns the lower-case equivalent of the input string', function() {
        assert.strictEqual(R.toLower('XYZ'), 'xyz');
    });
});
