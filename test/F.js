var assert = require('assert');

var R = require('..');


describe('F', function() {
    it('always returns false', function() {
        assert.strictEqual(R.F(10), false);
        assert.strictEqual(R.F(true), false);
    });

    it('is unary', function() {
        assert.strictEqual(R.F.length, 1);
    });
});
