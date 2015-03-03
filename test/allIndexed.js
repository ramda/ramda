var assert = require('assert');

var R = require('..');


describe('allIndexed', function() {
    var even = function(n) {return n % 2 === 0;};
    var T = function() {return true;};

    it('predicate has access to index', function() {
        var indices = [];
        var recordIndex = function(n, index) { indices.push(index);return true; };
        R.allIndexed(recordIndex, [2, 4, 6, 8, 10, 12]);
        assert.deepEqual(indices, [0, 1, 2, 3, 4, 5]);
    });

    it('predicate has access to list', function() {
        var lists = [];
        var recordIndex = function(n, index, list) { lists.push(list);return true; };
        var items = [1, 2, 3];

        R.allIndexed(recordIndex, [1, 2, 3]);
        assert.deepEqual(lists, [items, items, items]);
    });

    it('returns true if all elements satisfy the predicate', function() {
        assert.strictEqual(R.allIndexed(even, [2, 4, 6, 8, 10, 12]), true);
    });

    it('returns false if any element fails to satisfy the predicate', function() {
        assert.strictEqual(R.allIndexed(even, [2, 4, 6, 8, 9, 10]), false);
    });

    it('returns true for an empty list', function() {
        assert.strictEqual(R.allIndexed(T, []), true);
    });

    it('short-circuits on first false value', function() {
        var count = 0;
        var test = function(n) {count++; return even(n);};
        var result = R.allIndexed(test, [2, 4, 6, 7, 8, 10]);
        assert(!result);
        assert.strictEqual(count, 4);
    });

    it('works with more complex objects', function() {
        var xs = [{x: 'abc'}, {x: 'ade'}, {x: 'fghiajk'}];
        function len3(o) { return o.x.length === 3; }
        function hasA(o) { return o.x.indexOf('a') > -1; }
        assert.strictEqual(R.allIndexed(len3, xs), false);
        assert.strictEqual(R.allIndexed(hasA, xs), true);
    });

    it('is automatically curried', function() {
        var count = 0;
        var test = function(n) {count++; return even(n);};
        assert(R.allIndexed(test)([2, 4, 6, 7, 8, 10]) === false);
    });
});
