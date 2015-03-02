var assert = require('assert');

var R = require('..');


describe('length', function() {
    it('returns the length of a list', function() {
        assert.strictEqual(R.length([]), 0);
        assert.strictEqual(R.length(['a', 'b', 'c', 'd']), 4);
    });

    it('returns the length of a string', function() {
        assert.strictEqual(R.length(''), 0);
        assert.strictEqual(R.length('xyz'), 3);
    });

    it('returns the length of a function', function() {
        assert.strictEqual(R.length(function() {}), 0);
        assert.strictEqual(R.length(function(x, y, z) { return z; }), 3);
    });

    it('returns the length of an arguments object', function() {
        assert.strictEqual(R.length((function() { return arguments; }())), 0);
        assert.strictEqual(R.length((function() { return arguments; }('x', 'y', 'z'))), 3);
    });

    it('returns NaN for value of unexpected type', function() {
        function isNaN_(x) { return x !== x; }
        assert(isNaN_(R.length(0)));
        assert(isNaN_(R.length({})));
        assert(isNaN_(R.length(null)));
        assert(isNaN_(R.length(undefined)));
    });

    it('returns NaN for length property of unexpected type', function() {
        function isNaN_(x) { return x !== x; }
        assert(isNaN_(R.length({length: ''})));
        assert(isNaN_(R.length({length: '1.23'})));
        assert(isNaN_(R.length({length: null})));
        assert(isNaN_(R.length({length: undefined})));
        assert(isNaN_(R.length({})));
    });
});
