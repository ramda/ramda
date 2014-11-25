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

    it('throws on zero arguments', function() {
        assert.throws(R.find, TypeError);
    });
});

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

    it('throws on zero arguments', function() {
        assert.throws(R.findIndex, TypeError);
    });
});

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

    it('throws on zero arguments', function() {
        assert.throws(R.findLast, TypeError);
    });
});

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

    it('throws on zero arguments', function() {
        assert.throws(R.findLastIndex, TypeError);
    });
});
