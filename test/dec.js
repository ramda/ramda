var assert = require('assert');

var R = require('..');


describe('dec', function() {

    it('decrements its argument', function() {
        assert.strictEqual(R.dec(-1), -2);
        assert.strictEqual(R.dec(0), -1);
        assert.strictEqual(R.dec(1), 0);
        assert.strictEqual(R.dec(12.34), 11.34);
        assert.strictEqual(R.dec(-Infinity), -Infinity);
        assert.strictEqual(R.dec(Infinity), Infinity);
    });

});
