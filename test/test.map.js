var assert = require('assert');
var R = require('..');

describe('map', function() {
    var times2 = function(x) {return x * 2;};
    var add1 = function(x) {return x + 1;};

    it('maps simple functions over arrays', function() {
        assert.deepEqual(R.map(times2, [1, 2, 3, 4]), [2, 4, 6, 8]);
    });

    it('is automatically curried', function() {
        var inc = R.map(add1);
        assert.deepEqual(inc([1, 2, 3]), [2, 3, 4]);
    });

    it('correctly reports the arity of curried versions', function() {
        var inc = R.map(add1);
        assert.equal(inc.length, 1);
    });

});

describe('map.idx', function() {
    var times2 = function(x) {return x * 2;};
    var addIdx = function(x, idx) {return x + idx;};
    var squareEnds = function(x, idx, list) {
        return (idx === 0 || idx === list.length - 1) ? x * x : x;
    };

    it('works just like a normal map', function() {
        assert.deepEqual(R.map.idx(times2, [1, 2, 3, 4]), [2, 4, 6, 8]);
    });

    it('passes the index as a second parameter to the callback', function() {
        assert.deepEqual(R.map.idx(addIdx, [8, 6, 7, 5, 3, 0, 9]), [8 + 0, 6 + 1, 7 + 2, 5 + 3, 3 + 4, 0 + 5, 9 + 6]);
    });

    it('passes the entire list as a third parameter to the callback', function() {
        assert.deepEqual(R.map.idx(squareEnds, [8, 6, 7, 5, 3, 0, 9]), [64, 6, 7, 5, 3, 0, 81]);
    });

    it('is automatically curried', function() {
        var makeSquareEnds = R.map.idx(squareEnds);
        assert.deepEqual(makeSquareEnds([8, 6, 7, 5, 3, 0, 9]), [64, 6, 7, 5, 3, 0, 81]);
    });
});

describe('mapObj', function() {
    var square = function(n) {return n * n;};

    it('runs the given function over each of the object properties', function() {
        var obj = {a: 1, b: 2, c: 3};
        assert.deepEqual(R.mapObj(square, obj), {a: 1, b: 4, c: 9});
    });
});

describe('mapObj.idx', function() {
    var times2 = function(x) {return x * 2;};
    var addIdx = function(x, key) {return x + key;};
    var squareVowels = function(x, key) {
        var vowels = ['a', 'e', 'i', 'o', 'u'];
        return R.contains(key, vowels) ? x * x : x;
    };

    it('works just like a normal mapObj', function() {
        assert.deepEqual(R.mapObj.idx(times2, {a: 1, b: 2, c: 3, d: 4}), {a: 2, b: 4, c: 6, d: 8});
    });

    it('passes the index as a second parameter to the callback', function() {
        assert.deepEqual(R.mapObj.idx(addIdx, {a: 8, b: 6, c: 7, d: 5, e: 3, f: 0, g: 9}),
          {a: '8a', b: '6b', c: '7c', d: '5d', e: '3e', f: '0f', g: '9g'});
    });

    it('passes the entire list as a third parameter to the callback', function() {
        assert.deepEqual(R.mapObj.idx(squareVowels, {a: 8, b: 6, c: 7, d: 5, e: 3, f: 0, g: 9}),
          {a: 64, b: 6, c: 7, d: 5, e: 9, f: 0, g: 9});
    });

    it('is automatically curried', function() {
        var makeSquareVowels = R.mapObj.idx(squareVowels);
        assert.deepEqual(makeSquareVowels({a: 8, b: 6, c: 7, d: 5, e: 3, f: 0, g: 9}),
          {a: 64, b: 6, c: 7, d: 5, e: 9, f: 0, g: 9});
    });
});
