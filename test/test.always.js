var assert = require('assert');
var R = require('..');

describe('always', function() {
    it('returns a function that returns the object initially supplied', function() {
        var theMeaning = R.always(42);
        assert.equal(theMeaning(), 42);
        assert.equal(theMeaning(10), 42);
        assert.equal(theMeaning(false), 42);
    });

    it('works with various types', function() {
        assert.equal(R.always(false)(), false);
        assert.equal(R.always('abc')(), 'abc');
        assert.deepEqual(R.always({a: 1, b: 2})(), {a: 1, b: 2});
        var obj = {a: 1, b: 2};
        assert.strictEqual(R.always(obj)(), obj);
        var now = new Date(1776, 6, 4);
        assert.deepEqual(R.always(now)(), new Date(1776, 6, 4));
        assert.equal(R.always()(), undefined);
    });
});

describe ('alwaysZero', function() {
    it('always returns zero', function() {
        assert.equal(R.alwaysZero(), 0);
        assert.equal(R.alwaysZero(10), 0);
        assert.equal(R.alwaysZero(false), 0);
    });
});

describe ('alwaysFalse', function() {
    it('always returns false', function() {
        assert.equal(R.alwaysFalse(), false);
        assert.equal(R.alwaysFalse(10), false);
        assert.equal(R.alwaysFalse(true), false);
    });
});

describe ('alwaysTrue', function() {
    it('always returns true', function() {
        assert.equal(R.alwaysTrue(), true);
        assert.equal(R.alwaysTrue(10), true);
        assert.equal(R.alwaysTrue(true), true);
    });
});
