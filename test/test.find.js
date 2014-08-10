var assert = require("assert");
var R = require("./../ramda");

describe('find', function() {
    var find = R.find;
    var obj1 = {x: 100};
    var obj2 = {x: 200};
    var a = [11, 10, 9, 'cow', obj1, 8, 7, 100, 200, 300, obj2, 4, 3, 2, 1, 0];
    var even = function(x) { return x % 2 === 0; };
    var gt100 = function(x) { return x > 100; };
    var isStr = function(x) { return typeof x === "string"; };
    var xGt100 = function(o) { return o && o.x > 100; };

    it("returns the first element that satisfies the predicate", function() {
        assert.equal(find(even, a), 10);
        assert.equal(find(gt100, a), 200);
        assert.equal(find(isStr, a), 'cow');
        assert.equal(find(xGt100, a), obj2);
    });

    it("returns `undefined` when no element satisfies the predicate", function() {
        assert.equal(find(even, 'zing'), undefined);
    });
});

describe('findIndex', function() {
    var findIndex = R.findIndex;
    var obj1 = {x: 100};
    var obj2 = {x: 200};
    var a = [11, 10, 9, 'cow', obj1, 8, 7, 100, 200, 300, obj2, 4, 3, 2, 1, 0];
    var even = function(x) { return x % 2 === 0; };
    var gt100 = function(x) { return x > 100; };
    var isStr = function(x) { return typeof x === "string"; };
    var xGt100 = function(o) { return o && o.x > 100; };

    it("returns the index of the first element that satisfies the predicate", function() {
        assert.equal(findIndex(even, a), 1);
        assert.equal(findIndex(gt100, a), 8);
        assert.equal(findIndex(isStr, a), 3);
        assert.equal(findIndex(xGt100, a), 10);
    });

    it("returns -1 when no element satisfies the predicate", function() {
        assert.equal(findIndex(even, 'zing'), -1);
    });
});

describe('findLast', function() {
    var findLast = R.findLast;
    var obj1 = {x: 100};
    var obj2 = {x: 200};
    var a = [11, 10, 9, 'cow', obj1, 8, 7, 100, 200, 300, obj2, 4, 3, 2, 1, 0];
    var even = function(x) { return x % 2 === 0; };
    var gt100 = function(x) { return x > 100; };
    var isStr = function(x) { return typeof x === "string"; };
    var xGt100 = function(o) { return o && o.x > 100; };

    it("returns the index of the last element that satisfies the predicate", function() {
        assert.equal(findLast(even, a), 0);
        assert.equal(findLast(gt100, a), 300);
        assert.equal(findLast(isStr, a), 'cow');
        assert.equal(findLast(xGt100, a), obj2);
    });

    it("returns `undefined` when no element satisfies the predicate", function() {
        assert.equal(findLast(even, 'zing'), undefined);
    });
});

describe('findLastIndex', function() {
    var findLastIndex = R.findLastIndex;
    var obj1 = {x: 100};
    var obj2 = {x: 200};
    var a = [11, 10, 9, 'cow', obj1, 8, 7, 100, 200, 300, obj2, 4, 3, 2, 1, 0];
    var even = function(x) { return x % 2 === 0; };
    var gt100 = function(x) { return x > 100; };
    var isStr = function(x) { return typeof x === "string"; };
    var xGt100 = function(o) { return o && o.x > 100; };

    it("returns the index of the last element that satisfies the predicate", function() {
        assert.equal(findLastIndex(even, a), 15);
        assert.equal(findLastIndex(gt100, a), 9);
        assert.equal(findLastIndex(isStr, a), 3);
        assert.equal(findLastIndex(xGt100, a), 10);
    });

    it("returns -1 when no element satisfies the predicate", function() {
        assert.equal(findLastIndex(even, 'zing'), -1);
    });
});
