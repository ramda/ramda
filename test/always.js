var assert = require('assert');

var R = require('..');


describe('always', function() {
    it('returns a function that returns the object initially supplied', function() {
        var theMeaning = R.always(42);
        assert.strictEqual(theMeaning(), 42);
        assert.strictEqual(theMeaning(10), 42);
        assert.strictEqual(theMeaning(false), 42);
    });

    it('works with various types', function() {
        assert.strictEqual(R.always(false)(), false);
        assert.strictEqual(R.always('abc')(), 'abc');
        assert.deepEqual(R.always({a: 1, b: 2})(), {a: 1, b: 2});
        var obj = {a: 1, b: 2};
        assert.strictEqual(R.always(obj)(), obj);
        var now = new Date(1776, 6, 4);
        assert.deepEqual(R.always(now)(), new Date(1776, 6, 4));
        assert.strictEqual(R.always(undefined)(), undefined);
    });
});
