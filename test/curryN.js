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

    it('will curry any function it returns', function() {
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
