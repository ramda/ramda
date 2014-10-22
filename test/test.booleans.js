var assert = require('assert');
var R = require('..');

describe('or', function() {
    it('combines two boolean-returning functions into one', function() {
        var even = function(x) {return x % 2 === 0;};
        var gt10 = function(x) {return x > 10;};
        var f = R.or(even, gt10);
        assert.equal(f(8), true);
        assert.equal(f(13), true);
        assert.equal(f(7), false);
    });

    it('accepts functions that take multiple parameters', function() {
        var between = function(a, b, c) {return a < b && b < c;};
        var total20 = function(a, b, c) {return a + b + c === 20;};
        var f = R.or(between, total20);
        assert.equal(f(4, 5, 8), true);
        assert.equal(f(12, 2, 6), true);
        assert.equal(f(7, 5, 1), false);
    });

    it('does not evaluate the second expression if the first one is true', function() {
        var T = function() { return true; };
        var Z = function() { effect = 'Z got evaluated'; };
        var effect = 'not evaluated';
        R.or(T, Z);
        assert.equal(effect, 'not evaluated');
    });

    it('is curried', function() {
        var even = function(x) {return x % 2 === 0;};
        var gt10 = function(x) {return x > 10;};
        var evenOr = R.or(even);
        assert.equal(typeof evenOr(gt10), 'function');
        assert.equal(evenOr(gt10)(11), true);
        assert.equal(evenOr(gt10)(9), false);
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
        assert.equal(f(8), false);
        assert.equal(f(13), false);
        assert.equal(f(14), true);
    });

    it('accepts functions that take multiple parameters', function() {
        var between = function(a, b, c) {return a < b && b < c;};
        var total20 = function(a, b, c) {return a + b + c === 20;};
        var f = R.and(between, total20);
        assert.equal(f(4, 5, 11), true);
        assert.equal(f(12, 2, 6), false);
        assert.equal(f(5, 6, 15), false);
    });

    it('does not evaluate the second expression if the first one is false', function() {
        var F = function() { return false; };
        var Z = function() { effect = 'Z got evaluated'; };
        var effect = 'not evaluated';
        R.and(F, Z);
        assert.equal(effect, 'not evaluated');
    });

    it('is curried', function() {
        var even = function(x) {return x % 2 === 0;};
        var gt10 = function(x) {return x > 10;};
        var evenAnd = R.and(even);
        assert.equal(typeof evenAnd(gt10), 'function');
        assert.equal(evenAnd(gt10)(11), false);
        assert.equal(evenAnd(gt10)(12), true);
    });

    it('throws on zero arguments', function() {
        assert.throws(R.and, TypeError);
    });
});

describe('not', function() {
    it('creates boolean-returning function that reverses another', function() {
        var even = function(x) {return x % 2 === 0;};
        var f = R.not(even);
        assert.equal(f(8), false);
        assert.equal(f(13), true);
    });

    it('accepts a function that take multiple parameters', function() {
        var between = function(a, b, c) {return a < b && b < c;};
        var f = R.not(between);
        assert.equal(f(4, 5, 11), false);
        assert.equal(f(12, 2, 6), true);
    });
});

describe('allPredicates', function() {
    var odd = function(n) {return n % 2 !== 0;};
    var lt20 = function(n) {return n < 20;};
    var gt5 = function(n) {return n > 5;};
    var plusEq = function(w, x, y, z) { return w + x  === y + z; };

    it('reports whether all predicates are satisfied by a given value', function() {
        var ok = R.allPredicates([odd, lt20, gt5]);
        assert.equal(ok(7), true);
        assert.equal(ok(9), true);
        assert.equal(ok(10), false);
        assert.equal(ok(3), false);
        assert.equal(ok(21), false);
    });

    it('does not have to be curried', function() {
        assert.equal(R.allPredicates([odd, gt5], 3), false);
        assert.equal(R.allPredicates([odd, gt5], 7), true);
    });

    it('reports its arity as the longest predicate length', function() {
        assert.equal(R.allPredicates([odd, gt5, plusEq]).length, 4);
    });
});

describe('anyPredicates', function() {
    var odd = function(n) {return n % 2 !== 0;};
    var gt20 = function(n) {return n > 20;};
    var lt5 = function(n) {return n < 5;};
    var plusEq = function(w, x, y, z) { return w + x  === y + z; };

    it('reports whether any predicates are satisfied by a given value', function() {
        var ok = R.anyPredicates([odd, gt20, lt5]);
        assert.equal(ok(7), true);
        assert.equal(ok(9), true);
        assert.equal(ok(10), false);
        assert.equal(ok(18), false);
        assert.equal(ok(3), true);
        assert.equal(ok(22), true);
    });

    it('does not have to be curried', function() {
        assert.equal(R.anyPredicates([odd, lt5], 3), true);
        assert.equal(R.anyPredicates([odd, lt5], 22), false);
    });

    it('reports its arity as the longest predicate length', function() {
        assert.equal(R.anyPredicates([odd, lt5, plusEq]).length, 4);
    });
});
