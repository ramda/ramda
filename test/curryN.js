var assert = require('assert');

var R = require('..');


describe('curryN', function() {
    function source(a, b, c, d) {
        void d;
        return a * b * c;
    }
    it('accepts an arity', function() {
        var curried = R.curryN(3, source);
        assert.strictEqual(curried(1)(2)(3), 6);
        assert.strictEqual(curried(1, 2)(3), 6);
        assert.strictEqual(curried(1)(2, 3), 6);
        assert.strictEqual(curried(1, 2, 3), 6);
    });

    it('will curry any returned function if its length > 1', function() {
        function test(x, y, z) {
            void z;
            return source;
        }
        var curried = R.curryN(3, test);
        var retval = curried(1, 2, 3);
        assert.strictEqual(typeof retval, 'function');
        assert.strictEqual(retval.length, 4);
        assert.strictEqual(retval(1, 2, 3, 4), 6);
        assert.strictEqual(retval(1, 2, 3)(4), 6);
        assert.strictEqual(retval(1, 2)(3, 4), 6);
        assert.strictEqual(retval(1)(2)(3)(4), 6);
    });

    it('will not curry any returned function if its length < 2', function() {
        function test0(x, y) {
            return function() { // length == 0
                return y;
            };
        }
        function test1(x, y) {
            return function(z) { // length == 1
                return z + y;
            };
        }
        var curried0 = R.curryN(2, test0);
        var curried1 = R.curryN(2, test1);
        var retval0 = curried0(1, 2);
        var retval1 = curried1(1, 2);

        assert.strictEqual(typeof retval0, 'function');
        assert.strictEqual(retval0.length, 0);
        assert.strictEqual(retval0(), 2);
        assert.strictEqual(retval0(33, 33, 33), 2);

        assert.strictEqual(typeof retval1, 'function');
        assert.strictEqual(retval1.length, 1);
        assert.strictEqual(retval1(1), 3);
        assert.strictEqual(retval1(33), 35);
    });

    it('can be partially applied', function() {
        var curry3 = R.curryN(3);
        var curried = curry3(source);
        assert.strictEqual(curried.length, 3);
        assert.strictEqual(curried(1)(2)(3), 6);
        assert.strictEqual(curried(1, 2)(3), 6);
        assert.strictEqual(curried(1)(2, 3), 6);
        assert.strictEqual(curried(1, 2, 3), 6);
    });
});
