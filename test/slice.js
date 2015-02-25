var assert = require('assert');

var R = require('..');


describe('slice', function() {
    it('retrieves the proper sublist of a list', function() {
        var list = [8, 6, 7, 5, 3, 0, 9];
        assert.deepEqual(R.slice(2, 5, list), [7, 5, 3]);
    });
    it('handles array-like object', function() {
        var args = (function() { return arguments; }(1, 2, 3, 4, 5));
        assert.deepEqual(R.slice(1, 4, args), [2, 3, 4]);
    });
    it('dispatches to `slice` method', function() {
        var obj = {slice: function() { return 42; }};
        assert.strictEqual(R.slice(1, 4, obj), 42);
    });
});
