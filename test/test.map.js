var assert = require("assert");
var Lib = require("./../ramda");

describe('map', function() {
    var map = Lib.map;
    var times2 = function(x) {return x * 2;};
    var add1 = function(x) {return x + 1;};

    it('maps simple functions over arrays', function() {
        assert.deepEqual(map(times2, [1, 2, 3, 4]), [2, 4, 6, 8]);
    });

    it('is automatically curried', function() {
        var inc = map(add1);
        assert.deepEqual(inc([1, 2, 3]), [2, 3, 4]);
    });

    it('correctly reports the arity of curried versions', function() {
        var inc = map(add1);
        assert.equal(inc.length, 1);
    });

});

describe('map.idx', function() {
    var map = Lib.map;
    var times2 = function(x) {return x * 2;};
    var addIdx = function(x, idx) {return x + idx;};
    var squareEnds = function(x, idx, list) {
        return (idx === 0 || idx === list.length - 1) ? x * x : x;
    };

    it('works just like a normal map', function() {
        assert.deepEqual(map.idx(times2, [1, 2, 3, 4]), [2, 4, 6, 8]);
    });

    it('passes the index as a second parameter to the callback', function() {
        assert.deepEqual(map.idx(addIdx, [8, 6, 7, 5, 3, 0, 9]), [8 + 0, 6 + 1, 7 + 2, 5 + 3, 3 + 4, 0 + 5, 9 + 6]);
    });

    it('passes the entire list as a third parameter to the callback', function() {
        assert.deepEqual(map.idx(squareEnds, [8, 6, 7, 5, 3, 0, 9]), [64, 6, 7, 5, 3, 0, 81]);
    });

    it('is automatically curried', function() {
        var makeSquareEnds = map.idx(squareEnds);
        assert.deepEqual(makeSquareEnds([8, 6, 7, 5, 3, 0, 9]), [64, 6, 7, 5, 3, 0, 81]);
    });
});

describe('mapObj', function() {
    var mapObj = Lib.mapObj;
    var square = function(n) {return n * n;};

    it('runs the given function over each of the object properties', function() {
        var obj = {a: 1, b: 2, c: 3};
        assert.deepEqual(mapObj(square, obj), {a: 1, b: 4, c: 9});
    })
});