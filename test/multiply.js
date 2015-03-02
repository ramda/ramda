var assert = require('assert');

var R = require('..');


describe('multiply', function() {
    it('adds together two numbers', function() {
        assert.strictEqual(R.multiply(6, 7), 42);
    });

    it('is automatically curried', function() {
        var dbl = R.multiply(2);
        assert.strictEqual(dbl(15), 30);
    });
});
