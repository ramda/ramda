var assert = require('assert');

var R = require('..');


describe('findLast', function() {
    var obj1 = {x: 100};
    var obj2 = {x: 200};
    var a = [11, 10, 9, 'cow', obj1, 8, 7, 100, 200, 300, obj2, 4, 3, 2, 1, 0];
    var even = function(x) { return x % 2 === 0; };
    var gt100 = function(x) { return x > 100; };
    var isStr = function(x) { return typeof x === 'string'; };
    var xGt100 = function(o) { return o && o.x > 100; };

    it('returns the index of the last element that satisfies the predicate', function() {
        assert.strictEqual(R.findLast(even, a), 0);
        assert.strictEqual(R.findLast(gt100, a), 300);
        assert.strictEqual(R.findLast(isStr, a), 'cow');
        assert.strictEqual(R.findLast(xGt100, a), obj2);
    });

    it('returns `undefined` when no element satisfies the predicate', function() {
        assert.strictEqual(R.findLast(even, 'zing'), undefined);
    });

    it('works when the first element matches', function() {
        assert.strictEqual(R.findLast(even, [2, 3, 5]), 2);
    });

    it('does not go into an infinite loop on an empty array', function() {
        assert.strictEqual(R.findLast(even, []), undefined);
    });

    it('is curried', function() {
        assert.strictEqual(typeof R.findLast(even), 'function');
        assert.strictEqual(R.findLast(even)(a), 0);
    });
});
