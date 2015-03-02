var assert = require('assert');

var R = require('..');


describe('call', function() {
    it('returns the result of calling its first argument with the remaining arguments', function() {
        assert.strictEqual(R.call(Math.max, 1, 2, 3, -99, 42, 6, 7), 42);
    });

    it('accepts one or more arguments', function() {
        var fn = function() { return arguments.length; };
        assert.strictEqual(R.call(fn), 0);
        assert.strictEqual(R.call(fn, 'x'), 1);
        assert.strictEqual(R.call(fn, 'x', 'y'), 2);
        assert.strictEqual(R.call(fn, 'x', 'y', 'z'), 3);
    });

    it('provides no way to specify context', function() {
        var obj = {method: function() { return this === obj; }};
        assert.strictEqual(R.call(obj.method), false);
        assert.strictEqual(R.call(R.bind(obj.method, obj)), true);
    });
});
