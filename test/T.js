var assert = require('assert');

var R = require('..');


describe('T', function() {
    it('always returns true', function() {
        assert.strictEqual(R.T(), true);
        assert.strictEqual(R.T(10), true);
        assert.strictEqual(R.T(true), true);
    });
});
