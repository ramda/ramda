var assert = require('assert');

var R = require('..');


describe('rem', function() {

    it('returns the remainder of dividing dividend by divisor', function() {
        assert.strictEqual(R.rem(42, 5), 2);
        assert.strictEqual(R.rem(-42, 5), -2);
        assert.strictEqual(R.rem(42, -5), 2);
        assert.strictEqual(R.rem(-42, -5), -2);
    });

    it('returns zero if dividend is zero and divisor is non-zero and finite', function() {
        assert.strictEqual(R.rem(0, 1), 0);
        assert.strictEqual(R.rem(0, -1), 0);
        assert.strictEqual(R.rem(0, 2.5), 0);
        assert.strictEqual(R.rem(0, -2.5), 0);
        assert.strictEqual(R.rem(0, Number.MAX_VALUE), 0);
        assert.strictEqual(R.rem(0, Number.MIN_VALUE), 0);
    });

    it('returns NaN if divisor is zero or infinite', function() {
        function isNaN_(x) { return x !== x; }
        assert(isNaN_(R.rem(1, 0)),         R.rem(1, 0)         + ' is NaN');
        assert(isNaN_(R.rem(1, Infinity)),  R.rem(1, Infinity)  + ' is NaN');
        assert(isNaN_(R.rem(1, -Infinity)), R.rem(1, -Infinity) + ' is NaN');
        assert(isNaN_(R.rem(0, 0)),         R.rem(0, 0)         + ' is NaN');
        assert(isNaN_(R.rem(0, Infinity)),  R.rem(0, Infinity)  + ' is NaN');
        assert(isNaN_(R.rem(0, -Infinity)), R.rem(0, -Infinity) + ' is NaN');
    });

    it('accepts arbitrary dividends and divisors', function() {
        function randomNumberBetween(min, max) {
            return min + (max - min) * Math.random();
        }
        var n = 100;
        while (n--) {
            var dividend = randomNumberBetween(-1e6, 1e6);
            var divisor  = randomNumberBetween(-1e6, 1e6);
            assert.strictEqual(R.rem(dividend, divisor), dividend % divisor);
        }
    });

    it('invokes valueOf on each operand exactly once', function() {
        var a = {
            count: 0,
            valueOf: function() {
                this.count += 1;
                return 42;
            }
        };
        var b = {
            count: 0,
            valueOf: function() {
                this.count += 1;
                return 42;
            }
        };
        R.rem(a, b);
        assert.strictEqual(a.count, 1);
        assert.strictEqual(b.count, 1);
    });

    it('is curried', function() {
        assert.strictEqual(R.rem(42)(5), 2);
    });

    it('accepts placeholder', function() {
        assert.strictEqual(R.rem(R.__, 5)(42), 2);
    });

    it('throws if given no arguments', function() {
        assert.throws(R.rem, TypeError);
    });

});
