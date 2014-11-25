var assert = require('assert');
var R = require('..');

describe('tap', function() {
    it('returns a function that always returns its argument', function() {
        var f = R.tap(R.I);
        assert.strictEqual(typeof f, 'function');
        assert.strictEqual(f(100), 100);
    });

    it("may take a function as the first argument that executes with tap's argument", function() {
        var sideEffect = 0;
        assert.strictEqual(sideEffect, 0);
        var rv = R.tap(function(x) { sideEffect = 'string ' + x; }, 200);
        assert.strictEqual(rv, 200);
        assert.strictEqual(sideEffect, 'string 200');
    });

});

describe('eq', function() {
    var a = [];
    var b = a;
    it('tests for strict equality of its operands', function() {
        assert.strictEqual(R.eq(100, 100), true);
        assert.strictEqual(R.eq(100, '100'), false);
        assert.strictEqual(R.eq([], []), false);
        assert.strictEqual(R.eq(a, b), true);
    });

    it('is curried', function() {
        var isA = R.eq(a);
        assert.strictEqual(isA([]), false);
    });

    it('throws if given no arguments', function() {
        assert.throws(R.eq, TypeError);
    });
});
