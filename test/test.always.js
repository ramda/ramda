var assert = require('assert');
var Lib = require('./../ramda');

describe('always', function() {
    var always = Lib.always;
    it('should return a function that returns the object initially supplied', function() {
        var theMeaning = always(42);
        assert.equal(theMeaning(), 42);
        assert.equal(theMeaning(10), 42);
        assert.equal(theMeaning(false), 42);
    });

    it('should work with various types', function() {
        assert.equal(always(false)(), false);
        assert.equal(always('abc')(), 'abc');
        assert.deepEqual(always({a: 1, b: 2})(), {a: 1, b: 2});
        var obj = {a: 1, b: 2};
        assert.strictEqual(always(obj)(), obj);
        var now = new Date(1776, 6, 4);
        assert.deepEqual(always(now)(), new Date(1776, 6, 4));
    });
});

describe ('alwaysZero', function() {
    var alwaysZero = Lib.alwaysZero;
    it('should always return zero', function() {
        assert.equal(alwaysZero(), 0);
        assert.equal(alwaysZero(10), 0);
        assert.equal(alwaysZero(false), 0);
    });
});

describe ('alwaysFalse', function() {
    var alwaysFalse = Lib.alwaysFalse;
    it('should always return false', function() {
        assert.equal(alwaysFalse(), false);
        assert.equal(alwaysFalse(10), false);
        assert.equal(alwaysFalse(true), false);
    });
});

describe ('alwaysTrue', function() {
    var alwaysTrue = Lib.alwaysTrue;
    it('should always return true', function() {
        assert.equal(alwaysTrue(), true);
        assert.equal(alwaysTrue(10), true);
        assert.equal(alwaysTrue(true), true);
    });
});