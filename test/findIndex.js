var assert = require('assert');

var R = require('..');


describe('findIndex', function() {
    var obj1 = {x: 100};
    var obj2 = {x: 200};
    var a = [11, 10, 9, 'cow', obj1, 8, 7, 100, 200, 300, obj2, 4, 3, 2, 1, 0];
    var even = function(x) { return x % 2 === 0; };
    var gt100 = function(x) { return x > 100; };
    var isStr = function(x) { return typeof x === 'string'; };
    var xGt100 = function(o) { return o && o.x > 100; };

    it('returns the index of the first element that satisfies the predicate', function() {
        assert.strictEqual(R.findIndex(even, a), 1);
        assert.strictEqual(R.findIndex(gt100, a), 8);
        assert.strictEqual(R.findIndex(isStr, a), 3);
        assert.strictEqual(R.findIndex(xGt100, a), 10);
    });

    it('returns -1 when no element satisfies the predicate', function() {
        assert.strictEqual(R.findIndex(even, ['zing']), -1);
        assert.strictEqual(R.findIndex(even, []), -1);
    });

    it('is curried', function() {
        assert.strictEqual(typeof R.findIndex(even), 'function');
        assert.strictEqual(R.findIndex(even)(a), 1);
    });
});
