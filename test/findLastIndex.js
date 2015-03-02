var assert = require('assert');

var R = require('..');


describe('findLastIndex', function() {
    var obj1 = {x: 100};
    var obj2 = {x: 200};
    var a = [11, 10, 9, 'cow', obj1, 8, 7, 100, 200, 300, obj2, 4, 3, 2, 1, 0];
    var even = function(x) { return x % 2 === 0; };
    var gt100 = function(x) { return x > 100; };
    var isStr = function(x) { return typeof x === 'string'; };
    var xGt100 = function(o) { return o && o.x > 100; };

    it('returns the index of the last element that satisfies the predicate', function() {
        assert.strictEqual(R.findLastIndex(even, a), 15);
        assert.strictEqual(R.findLastIndex(gt100, a), 9);
        assert.strictEqual(R.findLastIndex(isStr, a), 3);
        assert.strictEqual(R.findLastIndex(xGt100, a), 10);
    });

    it('returns -1 when no element satisfies the predicate', function() {
        assert.strictEqual(R.findLastIndex(even, 'zing'), -1);
    });

    it('works when the first element matches', function() {
        assert.strictEqual(R.findLastIndex(even, [2, 3, 5]), 0);
    });

    it('does not go into an infinite loop on an empty array', function() {
        assert.strictEqual(R.findLastIndex(even, []), -1);
    });

    it('is curried', function() {
        assert.strictEqual(typeof R.findLastIndex(even), 'function');
        assert.strictEqual(R.findLastIndex(even)(a), 15);
    });
});
