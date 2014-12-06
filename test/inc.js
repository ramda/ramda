var assert = require('assert');

var R = require('..');


describe('inc', function() {

    it('increments its argument', function() {
        assert.strictEqual(R.inc(-1), 0);
        assert.strictEqual(R.inc(0), 1);
        assert.strictEqual(R.inc(1), 2);
        assert.strictEqual(R.inc(12.34), 13.34);
        assert.strictEqual(R.inc(-Infinity), -Infinity);
        assert.strictEqual(R.inc(Infinity), Infinity);
    });

});
