var assert = require('assert');
var R = require('..');

describe('or', function() {
    it('combines two boolean-returning functions into one', function() {
        var even = function(x) {return x % 2 === 0;};
        var gt10 = function(x) {return x > 10;};
        var f = R.or(even, gt10);
        assert.strictEqual(f(8), true);
        assert.strictEqual(f(13), true);
        assert.strictEqual(f(7), false);
    });

    it('accepts functions that take multiple parameters', function() {
        var between = function(a, b, c) {return a < b && b < c;};
        var total20 = function(a, b, c) {return a + b + c === 20;};
        var f = R.or(between, total20);
        assert.strictEqual(f(4, 5, 8), true);
        assert.strictEqual(f(12, 2, 6), true);
        assert.strictEqual(f(7, 5, 1), false);
    });

    it('does not evaluate the second expression if the first one is true', function() {
        var T = function() { return true; };
        var Z = function() { effect = 'Z got evaluated'; };
        var effect = 'not evaluated';
        R.or(T, Z);
        assert.strictEqual(effect, 'not evaluated');
    });

    it('is curried', function() {
        var even = function(x) {return x % 2 === 0;};
        var gt10 = function(x) {return x > 10;};
        var evenOr = R.or(even);
        assert.strictEqual(typeof evenOr(gt10), 'function');
        assert.strictEqual(evenOr(gt10)(11), true);
        assert.strictEqual(evenOr(gt10)(9), false);
    });

    it('throws on zero arguments', function() {
        assert.throws(R.or, TypeError);
    });
});

describe('and', function() {
    it('combines two boolean-returning functions into one', function() {
        var even = function(x) {return x % 2 === 0;};
        var gt10 = function(x) {return x > 10;};
        var f = R.and(even, gt10);
        assert.strictEqual(f(8), false);
        assert.strictEqual(f(13), false);
        assert.strictEqual(f(14), true);
    });

    it('accepts functions that take multiple parameters', function() {
        var between = function(a, b, c) {return a < b && b < c;};
        var total20 = function(a, b, c) {return a + b + c === 20;};
        var f = R.and(between, total20);
        assert.strictEqual(f(4, 5, 11), true);
        assert.strictEqual(f(12, 2, 6), false);
        assert.strictEqual(f(5, 6, 15), false);
    });

    it('does not evaluate the second expression if the first one is false', function() {
        var F = function() { return false; };
        var Z = function() { effect = 'Z got evaluated'; };
        var effect = 'not evaluated';
        R.and(F, Z);
        assert.strictEqual(effect, 'not evaluated');
    });

    it('is curried', function() {
        var even = function(x) {return x % 2 === 0;};
        var gt10 = function(x) {return x > 10;};
        var evenAnd = R.and(even);
        assert.strictEqual(typeof evenAnd(gt10), 'function');
        assert.strictEqual(evenAnd(gt10)(11), false);
        assert.strictEqual(evenAnd(gt10)(12), true);
    });

    it('throws on zero arguments', function() {
        assert.throws(R.and, TypeError);
    });
});

describe('not', function() {
    it('creates boolean-returning function that reverses another', function() {
        var even = function(x) {return x % 2 === 0;};
        var f = R.not(even);
        assert.strictEqual(f(8), false);
        assert.strictEqual(f(13), true);
    });

    it('accepts a function that take multiple parameters', function() {
        var between = function(a, b, c) {return a < b && b < c;};
        var f = R.not(between);
        assert.strictEqual(f(4, 5, 11), false);
        assert.strictEqual(f(12, 2, 6), true);
    });
});

describe('allPass', function() {
    var odd = function(n) {return n % 2 !== 0;};
    var lt20 = function(n) {return n < 20;};
    var gt5 = function(n) {return n > 5;};
    var plusEq = function(w, x, y, z) { return w + x  === y + z; };

    it('reports whether all predicates are satisfied by a given value', function() {
        var ok = R.allPass([odd, lt20, gt5]);
        assert.strictEqual(ok(7), true);
        assert.strictEqual(ok(9), true);
        assert.strictEqual(ok(10), false);
        assert.strictEqual(ok(3), false);
        assert.strictEqual(ok(21), false);
    });

    it('does not have to be curried', function() {
        assert.strictEqual(R.allPass([odd, gt5], 3), false);
        assert.strictEqual(R.allPass([odd, gt5], 7), true);
    });

    it('reports its arity as the longest predicate length', function() {
        assert.strictEqual(R.allPass([odd, gt5, plusEq]).length, 4);
    });
});

describe('anyPass', function() {
    var odd = function(n) {return n % 2 !== 0;};
    var gt20 = function(n) {return n > 20;};
    var lt5 = function(n) {return n < 5;};
    var plusEq = function(w, x, y, z) { return w + x  === y + z; };

    it('reports whether any predicates are satisfied by a given value', function() {
        var ok = R.anyPass([odd, gt20, lt5]);
        assert.strictEqual(ok(7), true);
        assert.strictEqual(ok(9), true);
        assert.strictEqual(ok(10), false);
        assert.strictEqual(ok(18), false);
        assert.strictEqual(ok(3), true);
        assert.strictEqual(ok(22), true);
    });

    it('does not have to be curried', function() {
        assert.strictEqual(R.anyPass([odd, lt5], 3), true);
        assert.strictEqual(R.anyPass([odd, lt5], 22), false);
    });

    it('reports its arity as the longest predicate length', function() {
        assert.strictEqual(R.anyPass([odd, lt5, plusEq]).length, 4);
    });
});
