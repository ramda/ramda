var assert = require('assert');

var R = require('..');


describe('product', function() {
    it('multiplies together the array of numbers supplied', function() {
        assert.strictEqual(R.product([1, 2, 3, 4]), 24);
    });
});
