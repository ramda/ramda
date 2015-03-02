var assert = require('assert');

var R = require('..');


describe('divide', function() {
    it('divides two numbers', function() {
        assert.strictEqual(R.divide(28, 7), 4);
    });

    it('is curried', function() {
        var into28 = R.divide(28);
        assert.strictEqual(into28(7), 4);
    });

    it('behaves right curried when passed `R.__` for its first argument', function() {
        var half = R.divide(R.__, 2);
        assert.strictEqual(half(40), 20);
    });
});
