var assert = require('assert');

var R = require('..');


describe('mod', function() {

    it('returns the value of dividend modulo divisor', function() {
        assert.strictEqual(R.mod(42, 5), 2);
        assert.strictEqual(R.mod(-42, 5), 3);
        assert.strictEqual(R.mod(42, -5), -3);
        assert.strictEqual(R.mod(-42, -5), -2);
    });

    it('returns zero if dividend is zero and divisor is non-zero and finite', function() {
        assert.strictEqual(R.mod(0, 1), 0);
        assert.strictEqual(R.mod(0, -1), 0);
        assert.strictEqual(R.mod(0, 2.5), 0);
        assert.strictEqual(R.mod(0, -2.5), 0);
        assert.strictEqual(R.mod(0, Number.MAX_VALUE), 0);
        assert.strictEqual(R.mod(0, Number.MIN_VALUE), 0);
    });

    it('returns NaN if divisor is zero or infinite', function() {
        function isNaN_(x) { return x !== x; }
        assert(isNaN_(R.mod(1, 0)),         R.mod(1, 0)         + ' is NaN');
        assert(isNaN_(R.mod(1, Infinity)),  R.mod(1, Infinity)  + ' is NaN');
        assert(isNaN_(R.mod(1, -Infinity)), R.mod(1, -Infinity) + ' is NaN');
        assert(isNaN_(R.mod(0, 0)),         R.mod(0, 0)         + ' is NaN');
        assert(isNaN_(R.mod(0, Infinity)),  R.mod(0, Infinity)  + ' is NaN');
        assert(isNaN_(R.mod(0, -Infinity)), R.mod(0, -Infinity) + ' is NaN');
    });

    it('accepts arbitrary dividends and divisors', function() {
        function randomNumberBetween(min, max) {
            return min + (max - min) * Math.random();
        }
        var n = 100;
        while (n--) {
            var dividend = randomNumberBetween(-1e6, 1e6);
            var divisor  = randomNumberBetween(-1e6, 1e6);
            assert.strictEqual(
                Math.floor(dividend / divisor) * divisor + R.mod(dividend, divisor),
                dividend
            );
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
        R.mod(a, b);
        assert.strictEqual(a.count, 1);
        assert.strictEqual(b.count, 1);
    });

    it('is curried', function() {
        assert.strictEqual(R.mod(42)(5), 2);
    });

    it('accepts placeholder', function() {
        assert.strictEqual(R.mod(R.__, 5)(42), 2);
    });

    it('throws if given no arguments', function() {
        assert.throws(R.mod, TypeError);
    });

});
