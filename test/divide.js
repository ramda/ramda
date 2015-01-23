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

    it('behaves right curried when passed `undefined` for its first argument', function() {
        var half = R.divide(undefined, 2);
        assert.strictEqual(half(40), 20);
    });

    it('throws if given no arguments', function() {
        assert.throws(R.divide, TypeError);
    });
});
