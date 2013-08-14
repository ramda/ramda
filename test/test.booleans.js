var assert = require("assert");
var Lib = require("./../ramda");

describe('or', function() {
    var or = Lib.or;


    it('should match the Javascript `||`', function() {
        assert.equal(or(false, true), true);
        assert.equal(or(false, false), false);
        assert.equal(or(true, false), true);
        assert.equal(or(true, true), true);
    });

    it('should perform type coersion', function() {
        assert.equal(or(NaN, 1), true);
        assert.equal(or(0, ""), false);
        assert.equal(or({}, false), true);
        assert.equal(or([], "abc"), true);
    });

});

describe('and', function() {
    var and = Lib.and;

    it('should match the Javascript `&&`', function() {
        assert.equal(and(false, true), false);
        assert.equal(and(false, false), false);
        assert.equal(and(true, false), false);
        assert.equal(and(true, true), true);
    });

    it('should perform type coersion', function() {
        assert.equal(and(NaN, 1), false);
        assert.equal(and(0, ""), false);
        assert.equal(and({}, false), false);
        assert.equal(and([], "abc"), true);
    });
});

describe('not', function() {
    var not = Lib.not;

    it('should match the Javascript `!`', function() {
        assert.equal(not(false), true);
        assert.equal(not(true), false);
    });

    it('should perform type coersion', function() {
        assert.equal(not(NaN), true);
        assert.equal(not(0), true);
        assert.equal(not({}), false);
        assert.equal(not([]), false);
        assert.equal(not(1), false);
        assert.equal(not(""), true);
        assert.equal(not("abc"), false);
    });
});

describe('orFn', function() {
    var orFn = Lib.orFn;

    it('should combine two boolean-returning functions into one', function() {
        var even = function(x) {return x % 2 === 0;};
        var gt10 = function(x) {return x > 10;};
        var f = orFn(even, gt10);
        assert.equal(f(8), true);
        assert.equal(f(13), true);
        assert.equal(f(7), false);
    });

    it('should accept functions that take multiple parameters', function() {
        var between = function(a, b, c) {return a < b && b < c;};
        var total20 = function(a, b, c) {return a + b + c === 20;};
        var f = orFn(between, total20);
        assert.equal(f(4, 5, 8), true);
        assert.equal(f(12, 2, 6), true);
        assert.equal(f(7, 5, 1), false);
    });

    it("does not evaluate the second expression if the first one is true", function() {
        var T = function() { return true; };
        var Z = function() { effect = "Z got evaluated"; };
        var effect = "not evaluated";
        orFn(T, Z);
        assert.equal(effect, "not evaluated");
    });
});

describe('andFn', function() {
    var andFn = Lib.andFn;

    it('should combine two boolean-returning functions into one', function() {
        var even = function(x) {return x % 2 === 0;};
        var gt10 = function(x) {return x > 10;};
        var f = andFn(even, gt10);
        assert.equal(f(8), false);
        assert.equal(f(13), false);
        assert.equal(f(14), true);
    });

    it('should accept functions that take multiple parameters', function() {
        var between = function(a, b, c) {return a < b && b < c;};
        var total20 = function(a, b, c) {return a + b + c === 20;};
        var f = andFn(between, total20);
        assert.equal(f(4, 5, 11), true);
        assert.equal(f(12, 2, 6), false);
        assert.equal(f(5, 6, 15), false);
    });

    it("does not evaluate the second expression if the first one is false", function() {
        var F = function() { return false; };
        var Z = function() { effect = "Z got evaluated"; };
        var effect = "not evaluated";
        andFn(F, Z);
        assert.equal(effect, "not evaluated");
    });
});

describe('notFn', function() {
    var notFn = Lib.notFn;

    it('should create boolean-returning function that reverses another', function() {
        var even = function(x) {return x % 2 === 0;};
        var f = notFn(even);
        assert.equal(f(8), false);
        assert.equal(f(13), true);
    });

    it('should accept a function that take multiple parameters', function() {
        var between = function(a, b, c) {return a < b && b < c;};
        var f = notFn(between);
        assert.equal(f(4, 5, 11), false);
        assert.equal(f(12, 2, 6), true);
    });
});

