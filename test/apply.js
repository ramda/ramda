var assert = require('assert');

var R = require('..');


describe('apply', function() {
    it('applies function to argument list', function() {
        assert.strictEqual(R.apply(Math.max, [1, 2, 3, -99, 42, 6, 7]), 42);
    });

    it('is automatically curried', function() {
        assert.strictEqual(R.apply(Math.max)([1, 2, 3, -99, 42, 6, 7]), 42);
    });

    it('provides no way to specify context', function() {
        var obj = {method: function() { return this === obj; }};
        assert.strictEqual(R.apply(obj.method, []), false);
        assert.strictEqual(R.apply(R.bind(obj.method, obj), []), true);
    });
});
