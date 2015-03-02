var assert = require('assert');

var R = require('..');


describe('reduceRightIndexed', function() {
    var timesIndexed = function(tot, num, idx) {return tot + (num * idx);};
    var objectify = function(acc, elem, idx) { acc[elem] = idx; return acc;};

    it('folds lists in the right order', function() {
        assert.strictEqual(R.reduceRightIndexed(function(a, b, idx) {return a + idx + b;}, '', ['a', 'b', 'c', 'd']), '3d2c1b0a');
    });

    it('folds simple functions over arrays with the supplied accumulator', function() {
        assert.deepEqual(R.reduceRightIndexed(function(acc, n, idx) { return acc.concat([idx, n]); }, [], [12, 4, 10, 6]), [3, 6, 2, 10, 1, 4, 0, 12]);
    });

    it('returns the accumulator for an empty array', function() {
        var memo = [];
        assert.strictEqual(R.reduceRightIndexed(function(a, n, idx) { return a.concat(idx); }, memo, []), memo);
    });

    it('is automatically curried', function() {
        var something = R.reduceRightIndexed(function(acc, b, idx) { return acc += idx + b; }, 54);
        assert.strictEqual(something([12, 4, 10, 6]), 92);
    });

    it('correctly reports the arity of curried versions', function() {
        var something = R.reduceRightIndexed(function(acc, b, idx) { return acc += idx + b; }, 0);
        assert.strictEqual(something.length, 1);
    });

    it('passes the index as a third parameter to the predicate', function() {
        assert.strictEqual(R.reduceRightIndexed(timesIndexed, 0, [1, 2, 3, 4, 5]), 40);
        assert.deepEqual(R.reduceRightIndexed(objectify, {}, ['a', 'b', 'c', 'd', 'e']), {a: 0, b: 1, c: 2, d: 3, e: 4});
    });

    it('passes the entire list as a fourth parameter to the predicate', function() {
        var list = [1, 2, 3];
        R.reduceRightIndexed(function(acc, x, idx, ls) {
            assert.strictEqual(ls, list);
            return acc;
        }, 0, list);
    });

    it('is automatically curried', function() {
        var addOrConcat = R.reduceRightIndexed(R.add);
        var sum = addOrConcat(0);
        var cat = addOrConcat('');
        assert.strictEqual(sum([1, 2, 3, 4]), 10);
        assert.strictEqual(cat(['1', '2', '3', '4']), '4321');
    });
});
