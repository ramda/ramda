var assert = require('assert');

var R = require('..');


describe('subtract', function() {
    it('subtracts two numbers', function() {
        assert.strictEqual(R.subtract(22, 7), 15);
    });

    it('is curried', function() {
        var ninesCompl = R.subtract(9);
        assert.strictEqual(ninesCompl(6), 3);
    });
});
