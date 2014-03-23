var assert = require("assert");
var Lib = require("./../ramda");

describe('foldl', function() {
    var foldl = Lib.foldl;
    var add = function(a, b) {return a + b;};
    var mult = function(a, b) {return a * b;};

    it('should fold simple functions over arrays with the supplied accumulator', function() {
        assert.equal(foldl(add, 0, [1, 2, 3, 4]), 10);
        assert.equal(foldl(mult, 1, [1, 2, 3, 4]), 24);
    });

    it('should return the accumulator for an empty array', function() {
        assert.equal(foldl(add, 0, []), 0);
        assert.equal(foldl(mult, 1, []), 1);
    });

    it('should be automatically curried', function() {
        var sum = foldl(add, 0);
        assert.equal(sum([1, 2, 3, 4]), 10);
    });

    it('should be aliased by `reduce`', function() {
        assert.equal(Lib.reduce(add, 0, [1, 2, 3, 4]), 10);
        assert.strictEqual(Lib.reduce, foldl);
    });

    it('should correctly report the arity of curried versions', function() {
        var sum = foldl(add, 0);
        assert.equal(sum.length, 1);
    });
});

describe('foldr', function() {
    var foldr = Lib.foldr;
    var avg = function(a, b) {return (a + b) / 2;};

    it('should fold lists in the right order', function() {
        assert.equal(foldr(function(a, b) {return a + b;}, '', ['a', 'b', 'c', 'd']), 'dcba');
    });

    it('should fold simple functions over arrays with the supplied accumulator', function() {
        assert.equal(foldr(avg, 54, [12, 4, 10, 6]), 12);
    });

    it('should return the accumulator for an empty array', function() {
        assert.equal(foldr(avg, 0, []), 0);
    });

    it('should be automatically curried', function() {
        var something = foldr(avg, 54);
        assert.equal(something([12, 4, 10, 6]), 12);
    });

    it('should be aliased by `reduceRight`', function() {
        assert.equal(Lib.reduceRight(avg, 54, [12, 4, 10, 6]), 12);
        assert.strictEqual(Lib.reduceRight, foldr);
    });

    it('should correctly report the arity of curried versions', function() {
        var something = foldr(avg, 0);
        assert.equal(something.length, 1);
    });
});

describe('foldl.idx', function() {
    var foldl = Lib.foldl;
    var timesIdx = function(tot, num, idx, ls) {return tot + (num * idx);};
    var objectify = function(acc, elem, idx, ls) { acc[elem] = idx; return acc;};

    it('works just like normal foldl', function() {
    });

    it('passes the index as a third parameter to the predicate', function() {
        assert.equal(foldl.idx(timesIdx, 0, [1, 2, 3, 4, 5]), 40);
        assert.deepEqual(foldl.idx(objectify, {}, ['a', 'b', 'c', 'd', 'e']), {a: 0, b: 1, c: 2, d: 3, e: 4});
    });

    it('passes the entire list as a fourth parameter to the predicate', function() {
    });

});

describe('foldr.idx', function() {
    var foldr = Lib.foldr;

    it('folds lists in the right order', function() {
        assert.equal(foldr.idx(function(a, b, idx, list) {return a + idx + b;}, '', ['a', 'b', 'c', 'd']), '3d2c1b0a');
    });

    it('folds simple functions over arrays with the supplied accumulator', function() {
        assert.deepEqual(foldr.idx(function(acc, n, i) { return acc.concat([i, n]); }, [], [12, 4, 10, 6]), [3, 6, 2, 10, 1, 4, 0, 12]);
    });

    it('returns the accumulator for an empty array', function() {
        assert.equal(foldr.idx(function(a, n, i, ls) { return a.concat(i); }, [], []), 0);
    });

    it('should be automatically curried', function() {
        var something = foldr.idx(function(acc, b, i) { return acc += i + b; }, 54);
        assert.equal(something([12, 4, 10, 6]), 92);
    });

    it('should be aliased by `reduceRight`', function() {
        assert.strictEqual(Lib.reduceRight.idx, foldr.idx);
    });

    it('should correctly report the arity of curried versions', function() {
        var something = foldr.idx(function(acc, b, i) { return acc += i + b; }, 0);
        assert.equal(something.length, 1);
    });
});


