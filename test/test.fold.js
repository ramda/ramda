var assert = require('assert');
var R = require('..');

describe('foldl', function() {
    var add = function(a, b) {return a + b;};
    var mult = function(a, b) {return a * b;};

    it('folds simple functions over arrays with the supplied accumulator', function() {
        assert.strictEqual(R.foldl(add, 0, [1, 2, 3, 4]), 10);
        assert.strictEqual(R.foldl(mult, 1, [1, 2, 3, 4]), 24);
    });

    it('returns the accumulator for an empty array', function() {
        assert.strictEqual(R.foldl(add, 0, []), 0);
        assert.strictEqual(R.foldl(mult, 1, []), 1);
        assert.deepEqual(R.foldl(R.concat, [], []), []);
    });

    it('is automatically curried', function() {
        var addOrConcat = R.foldl(add);
        var sum = addOrConcat(0);
        var cat = addOrConcat('');
        assert.strictEqual(sum([1, 2, 3, 4]), 10);
        assert.strictEqual(cat(['1', '2', '3', '4']), '1234');
    });

    it('is aliased by `reduce`', function() {
        assert.strictEqual(R.reduce, R.foldl);
    });

    it('correctly reports the arity of curried versions', function() {
        var sum = R.foldl(add, 0);
        assert.strictEqual(sum.length, 1);
    });

    it('throws on zero arguments', function() {
        assert.throws(R.foldl, TypeError);
        assert.throws(R.foldl(R.add), TypeError);
    });
});

describe('foldr', function() {
    var avg = function(a, b) {return (a + b) / 2;};

    it('folds lists in the right order', function() {
        assert.strictEqual(R.foldr(function(a, b) {return a + b;}, '', ['a', 'b', 'c', 'd']), 'dcba');
    });

    it('folds simple functions over arrays with the supplied accumulator', function() {
        assert.strictEqual(R.foldr(avg, 54, [12, 4, 10, 6]), 12);
    });

    it('returns the accumulator for an empty array', function() {
        assert.strictEqual(R.foldr(avg, 0, []), 0);
    });

    it('is automatically curried', function() {
        var something = R.foldr(avg, 54);
        var rcat = R.foldr(R.add, '');
        assert.strictEqual(something([12, 4, 10, 6]), 12);
        assert.strictEqual(rcat(['1', '2', '3', '4']), '4321');
    });

    it('is aliased by `reduceRight`', function() {
        assert.strictEqual(R.reduceRight, R.foldr);
    });

    it('correctly reports the arity of curried versions', function() {
        var something = R.foldr(avg, 0);
        assert.strictEqual(something.length, 1);
    });

    it('throws on zero arguments', function() {
        assert.throws(R.foldr, TypeError);
        assert.throws(R.foldr(R.add), TypeError);
    });
});

describe('foldl.idx', function() {
    var timesIdx = function(tot, num, idx) {return tot + (num * idx);};
    var objectify = function(acc, elem, idx) { acc[elem] = idx; return acc;};

    it('works just like normal foldl', function() {
        assert.strictEqual(R.foldl.idx(R.add, 0, [1, 2, 3, 4]), 10);
        assert.strictEqual(R.foldl.idx(R.multiply, 1, [1, 2, 3, 4]), 24);
    });

    it('is aliased by `reduceRight`', function() {
        assert.strictEqual(R.reduceRight, R.foldr);
    });

    it('passes the index as a third parameter to the predicate', function() {
        assert.strictEqual(R.foldl.idx(timesIdx, 0, [1, 2, 3, 4, 5]), 40);
        assert.deepEqual(R.foldl.idx(objectify, {}, ['a', 'b', 'c', 'd', 'e']), {a: 0, b: 1, c: 2, d: 3, e: 4});
    });

    it('passes the entire list as a fourth parameter to the predicate', function() {
        var list = [1, 2, 3];
        R.foldl.idx(function(acc, x, idx, ls) {
            assert.strictEqual(ls, list);
            return acc;
        }, 0, list);
    });

    it('is automatically curried', function() {
        var addOrConcat = R.foldl.idx(R.add);
        var sum = addOrConcat(0);
        var cat = addOrConcat('');
        assert.strictEqual(sum([1, 2, 3, 4]), 10);
        assert.strictEqual(cat(['1', '2', '3', '4']), '1234');
    });

    it('throws on zero arguments', function() {
        assert.throws(R.foldl.idx, TypeError);
        assert.throws(R.foldl.idx(R.add), TypeError);
    });
});

describe('foldr.idx', function() {
    var timesIdx = function(tot, num, idx) {return tot + (num * idx);};
    var objectify = function(acc, elem, idx) { acc[elem] = idx; return acc;};

    it('folds lists in the right order', function() {
        assert.strictEqual(R.foldr.idx(function(a, b, idx) {return a + idx + b;}, '', ['a', 'b', 'c', 'd']), '3d2c1b0a');
    });

    it('folds simple functions over arrays with the supplied accumulator', function() {
        assert.deepEqual(R.foldr.idx(function(acc, n, idx) { return acc.concat([idx, n]); }, [], [12, 4, 10, 6]), [3, 6, 2, 10, 1, 4, 0, 12]);
    });

    it('returns the accumulator for an empty array', function() {
        var memo = [];
        assert.strictEqual(R.foldr.idx(function(a, n, idx) { return a.concat(idx); }, memo, []), memo);
    });

    it('is automatically curried', function() {
        var something = R.foldr.idx(function(acc, b, idx) { return acc += idx + b; }, 54);
        assert.strictEqual(something([12, 4, 10, 6]), 92);
    });

    it('is aliased by `reduceRight.idx`', function() {
        assert.strictEqual(R.reduceRight.idx, R.foldr.idx);
    });

    it('correctly reports the arity of curried versions', function() {
        var something = R.foldr.idx(function(acc, b, idx) { return acc += idx + b; }, 0);
        assert.strictEqual(something.length, 1);
    });

    it('passes the index as a third parameter to the predicate', function() {
        assert.strictEqual(R.foldr.idx(timesIdx, 0, [1, 2, 3, 4, 5]), 40);
        assert.deepEqual(R.foldr.idx(objectify, {}, ['a', 'b', 'c', 'd', 'e']), {a: 0, b: 1, c: 2, d: 3, e: 4});
    });

    it('passes the entire list as a fourth parameter to the predicate', function() {
        var list = [1, 2, 3];
        R.foldr.idx(function(acc, x, idx, ls) {
            assert.strictEqual(ls, list);
            return acc;
        }, 0, list);
    });

    it('is automatically curried', function() {
        var addOrConcat = R.foldr.idx(R.add);
        var sum = addOrConcat(0);
        var cat = addOrConcat('');
        assert.strictEqual(sum([1, 2, 3, 4]), 10);
        assert.strictEqual(cat(['1', '2', '3', '4']), '4321');
    });

    it('throws on zero arguments', function() {
        assert.throws(R.foldr.idx, TypeError);
        assert.throws(R.foldr.idx(R.add), TypeError);
    });
});

describe('foldObj', function() {
    var objA = {x: 'lc x', y: 'lc y', z: 'lc z', X: 'uc X', Y: 'uc Y', Z: 'uc Z'};
    var objB = {X: 'uc X', Y: 'uc Y', Z: 'uc Z', x: 'lc x', y: 'lc y', z: 'lc z'};
    var objC = {X: 'uc X', x: 'lc x', Y: 'uc Y', y: 'lc y', Z: 'uc Z', z: 'lc z'};

    function cat(a, b) { return a + ' ' + b; }

    it('folds an object in sorted-key order', function() {
        assert.strictEqual(R.foldObj(cat, '', objA), ' uc X uc Y uc Z lc x lc y lc z');
        assert.strictEqual(R.foldObj(cat, '', objA), R.foldObj(cat, '', objB));
        assert.strictEqual(R.foldObj(cat, '', objA), R.foldObj(cat, '', objC));
    });

    it('returns the accumulator if the object has no enumerable own properties', function() {
        assert.deepEqual(R.foldObj(cat, {}, {}), {});
        assert.deepEqual(R.foldObj(cat, [], {}), []);
        assert.deepEqual(R.foldObj(cat, 0, {}), 0);
        assert.deepEqual(R.foldObj(cat, '', {}), '');
    });

    it('is curried', function() {
        assert(typeof R.foldObj(cat) === 'function');
        assert(typeof R.foldObj(cat)('') === 'function');
        assert(R.foldObj(cat)('')({b: 'B', a: 'A'}) === ' A B');
    });

    it('throws on zero arguments', function() {
        assert.throws(R.foldObj, TypeError);
    });
});

describe('foldObj.idx', function() {
    var objA = {x: 'lc x', y: 'lc y', z: 'lc z', X: 'uc X', Y: 'uc Y', Z: 'uc Z'};
    var objB = {X: 'uc X', Y: 'uc Y', Z: 'uc Z', x: 'lc x', y: 'lc y', z: 'lc z'};
    var objC = {X: 'uc X', x: 'lc x', Y: 'uc Y', y: 'lc y', Z: 'uc Z', z: 'lc z'};

    function catkv(a, v, k) { return a + ' ' + 'key: ' + k + ', ' + 'value: ' + v + ';' ; }
    function catkvo(a, v, k, o) { return a + ' (' + k + ', ' + v + ') ' + o.Y; }


    it('folds an object in sorted-key order', function() {
        assert.strictEqual(R.foldObj.idx(catkv, '', objA),
            ' key: X, value: uc X; key: Y, value: uc Y; key: Z, value: uc Z; key: x, value: lc x; key: y, value: lc y; key: z, value: lc z;');
        assert.strictEqual(R.foldObj.idx(catkv, '', objA), R.foldObj.idx(catkv, '', objB));
        assert.strictEqual(R.foldObj.idx(catkv, '', objA), R.foldObj.idx(catkv, '', objC));
    });

    it('may also pass the full object as the fourth parameter to the iterator function', function() {
        assert.strictEqual(R.foldObj.idx(catkvo, '', {b: 'B', a: 'A', Y: 'Y'}), ' (Y, Y) Y (a, A) Y (b, B) Y');
    });

    it('returns the accumulator if the object has no enumerable own properties', function() {
        assert.deepEqual(R.foldObj.idx(catkv, {}, {}), {});
        assert.deepEqual(R.foldObj.idx(catkv, [], {}), []);
        assert.deepEqual(R.foldObj.idx(catkv, 0, {}), 0);
        assert.deepEqual(R.foldObj.idx(catkv, '', {}), '');
    });

    it('is curried', function() {
        assert(typeof R.foldObj.idx(catkv) === 'function');
        assert(typeof R.foldObj.idx(catkv)('') === 'function');
        assert(R.foldObj.idx(catkv)('')({b: 'B', a: 'A'}) === ' key: a, value: A; key: b, value: B;');
    });

    it('throws on zero arguments', function() {
        assert.throws(R.foldObj.idx, TypeError);
    });

});

