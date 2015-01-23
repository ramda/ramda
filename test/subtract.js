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

    it('behaves right curried when passed `undefined` for its first argument', function() {
        var minus5 = R.subtract(undefined, 5);
        assert.strictEqual(minus5(17), 12);
    });

    it('throws if given no arguments', function() {
        assert.throws(R.subtract, TypeError);
    });
});
