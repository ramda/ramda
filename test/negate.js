var assert = require('assert');

var R = require('..');


describe('negate', function() {

    it('negates its argument', function() {
        assert.strictEqual(R.negate(-Infinity), Infinity);
        assert.strictEqual(R.negate(-1), 1);
        assert.strictEqual(R.negate(0), 0);
        assert.strictEqual(R.negate(1), -1);
        assert.strictEqual(R.negate(Infinity), -Infinity);
    });

});
