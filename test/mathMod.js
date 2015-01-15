var assert = require('assert');

var R = require('..');


describe('mathMod', function() {
    it('requires numerical arguments', function() {
        assert.ok(isNaN(R.mathMod('s', 3)));
        assert.ok(isNaN(R.mathMod(3, 's')));
        assert.ok(isNaN(R.mathMod(3, {})));
    });

    it('behaves differently than JS modulo', function() {
        assert.strictEqual(R.mathMod(-17, 5), 3);
        assert.strictEqual(R.mathMod(17, -5), 2);
    });

    it('computes the euclidean modulo function', function() {
        assert.strictEqual(R.mathMod(-17, 5), 3);
        assert.strictEqual(isNaN(R.mathMod(17, 0)), true);
        assert.strictEqual(R.mathMod(17, 5.5), 0.5);
    });

    it('is curried', function() {
        var f = R.mathMod(29);
        assert.strictEqual(f(6), 5);
    });

    it('behaves right curried when passed `undefined` for its first argument', function() {
        var mod5 = R.modulo(void 0, 5);
        assert.strictEqual(mod5(12), 2);
        assert.strictEqual(mod5(8), 3);
    });

    it('throws if given no arguments', function() {
        assert.throws(R.mathMod);
    });

    it('should return a positive value with a positive dividend and a negative divisor', function() {
        assert.strictEqual(R.mathMod(5, -3), 2);
    });

    it('should return a positive value with a negative dividend and a negative divisor', function() {
        assert.strictEqual(R.mathMod(-5, -3), 1);
    });
});
