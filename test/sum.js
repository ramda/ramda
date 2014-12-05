var assert = require('assert');

var R = require('..');


describe('sum', function() {
    it('adds together the array of numbers supplied', function() {
        assert.strictEqual(R.sum([1, 2, 3, 4]), 10);
    });

    it('does not save the state of the accumulator', function() {
        assert.strictEqual(R.sum([1, 2, 3, 4]), 10);
        assert.strictEqual(R.sum([1]), 1);
        assert.strictEqual(R.sum([5, 5, 5, 5, 5]), 25);
    });
});
