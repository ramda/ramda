var assert = require('assert');

var R = require('..');


describe('nAry', function() {

    function toArray(args) { return Array.prototype.slice.call(args, 0); }

    it('turns multiple-argument function into a nullary one', function() {
        var fn = R.nAry(0, function(x, y, z) { void z; return toArray(arguments); });
        assert.strictEqual(fn.length, 0);
        assert.deepEqual(fn(1, 2, 3), []);
    });

    it('turns multiple-argument function into a ternary one', function() {
        var fn = R.nAry(3, function(a, b, c, d) { void d; return toArray(arguments); });
        assert.strictEqual(fn.length, 3);
        assert.deepEqual(fn(1, 2, 3, 4), [1, 2, 3]);
        assert.deepEqual(fn(1), [1, undefined, undefined]);
    });

    it('creates functions of arbitrary arity', function() {
        var fn = R.nAry(10, function() { return toArray(arguments); });
        assert.strictEqual(fn.length, 10);
        assert.deepEqual(fn.apply(null, R.range(0, 25)), R.range(0, 10));

        var undefs = fn();
        var ns = R.repeat(undefined, 10);
        assert(undefs.length === ns.length);
        var idx = undefs.length;
        while (--idx) {
            assert(undefs[idx] === ns[idx]);
        }
    });
});
