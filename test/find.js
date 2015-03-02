var assert = require('assert');

var R = require('..');


describe('find', function() {
    var obj1 = {x: 100};
    var obj2 = {x: 200};
    var a = [11, 10, 9, 'cow', obj1, 8, 7, 100, 200, 300, obj2, 4, 3, 2, 1, 0];
    var even = function(x) { return x % 2 === 0; };
    var gt100 = function(x) { return x > 100; };
    var isStr = function(x) { return typeof x === 'string'; };
    var xGt100 = function(o) { return o && o.x > 100; };

    it('returns the first element that satisfies the predicate', function() {
        assert.strictEqual(R.find(even, a), 10);
        assert.strictEqual(R.find(gt100, a), 200);
        assert.strictEqual(R.find(isStr, a), 'cow');
        assert.strictEqual(R.find(xGt100, a), obj2);
    });

    it('returns `undefined` when no element satisfies the predicate', function() {
        assert.strictEqual(R.find(even, ['zing']), undefined);
    });

    it('returns `undefined` when given an empty list', function() {
        assert.strictEqual(R.find(even, []), undefined);
    });

    it('is curried', function() {
        assert.strictEqual(typeof R.find(even), 'function');
        assert.strictEqual(R.find(even)(a), 10);
    });
});
