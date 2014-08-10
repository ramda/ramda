var assert = require("assert");
var R = require("..");

describe('tap', function() {
    var tap = R.tap;
    it("returns a function that returns tap's argument", function() {
        var f = tap(100);
        assert.equal(typeof f, "function");
        assert.equal(f(null), 100);
    });

    it("may take a function for a second argument that executes with tap's argument", function() {
        var sideEffect = 0;
        assert.equal(sideEffect, 0);
        var rv = tap(200, function(x) { sideEffect = "string " + x; });
        assert.equal(rv, 200);
        assert.equal(sideEffect, "string 200");
    });

    it("ignores the scond argument if it's not a function", function() {
        assert(tap(300, 400), 300);
        assert(tap(300, [400]), 300);
        assert(tap(300, {x: 400}), 300);
        assert(tap(300, '400'), 300);
        assert(tap(300, false), 300);
        assert(tap(300, null), 300);
    });
});

describe('eq', function() {
    var eq = R.eq;
    var a = [];
    var b = a;
    it("tests for strict equality of its operands", function() {
        assert.equal(eq(100, 100), true);
        assert.equal(eq(100, '100'), false);
        assert.equal(eq([], []), false);
        assert.equal(eq(a, b), true);
    });
});
