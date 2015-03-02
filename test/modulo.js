var assert = require('assert');

var R = require('..');


describe('modulo', function() {
    it('divides the first param by the second and returns the remainder', function() {
        assert.strictEqual(R.modulo(100, 2), 0);
        assert.strictEqual(R.modulo(100, 3), 1);
        assert.strictEqual(R.modulo(100, 17), 15);
    });

    it('is curried', function() {
        var hundredMod = R.modulo(100);
        assert.strictEqual(typeof hundredMod, 'function');
        assert.strictEqual(hundredMod(2), 0);
        assert.strictEqual(hundredMod(3), 1);
        assert.strictEqual(hundredMod(17), 15);
    });

    it('preserves javascript-style modulo evaluation for negative numbers', function() {
        assert.strictEqual(R.modulo(-5, 4), -1);
    });
});
