var assert = require('assert');

var R = require('..');


describe('reduceIndexed', function() {
    var timesIndexed = function(tot, num, idx) {return tot + (num * idx);};
    var objectify = function(acc, elem, idx) { acc[elem] = idx; return acc;};

    it('works just like normal reduce', function() {
        assert.strictEqual(R.reduceIndexed(R.add, 0, [1, 2, 3, 4]), 10);
        assert.strictEqual(R.reduceIndexed(R.multiply, 1, [1, 2, 3, 4]), 24);
    });

    it('passes the index as a third parameter to the predicate', function() {
        assert.strictEqual(R.reduceIndexed(timesIndexed, 0, [1, 2, 3, 4, 5]), 40);
        assert.deepEqual(R.reduceIndexed(objectify, {}, ['a', 'b', 'c', 'd', 'e']), {a: 0, b: 1, c: 2, d: 3, e: 4});
    });

    it('passes the entire list as a fourth parameter to the predicate', function() {
        var list = [1, 2, 3];
        R.reduceIndexed(function(acc, x, idx, ls) {
            assert.strictEqual(ls, list);
            return acc;
        }, 0, list);
    });

    it('is automatically curried', function() {
        var addOrConcat = R.reduceIndexed(R.add);
        var sum = addOrConcat(0);
        var cat = addOrConcat('');
        assert.strictEqual(sum([1, 2, 3, 4]), 10);
        assert.strictEqual(cat(['1', '2', '3', '4']), '1234');
    });
});
