var assert = require('assert');

var R = require('..');


describe('mapObjIndexed', function() {
    var times2 = function(x) {return x * 2;};
    var addIndexed = function(x, key) {return x + key;};
    var squareVowels = function(x, key) {
        var vowels = ['a', 'e', 'i', 'o', 'u'];
        return R.contains(key, vowels) ? x * x : x;
    };

    it('works just like a normal mapObj', function() {
        assert.deepEqual(R.mapObjIndexed(times2, {a: 1, b: 2, c: 3, d: 4}), {a: 2, b: 4, c: 6, d: 8});
    });

    it('passes the index as a second parameter to the callback', function() {
        assert.deepEqual(R.mapObjIndexed(addIndexed, {a: 8, b: 6, c: 7, d: 5, e: 3, f: 0, g: 9}),
          {a: '8a', b: '6b', c: '7c', d: '5d', e: '3e', f: '0f', g: '9g'});
    });

    it('passes the entire list as a third parameter to the callback', function() {
        assert.deepEqual(R.mapObjIndexed(squareVowels, {a: 8, b: 6, c: 7, d: 5, e: 3, f: 0, g: 9}),
          {a: 64, b: 6, c: 7, d: 5, e: 9, f: 0, g: 9});
    });

    it('is automatically curried', function() {
        var makeSquareVowels = R.mapObjIndexed(squareVowels);
        assert.deepEqual(makeSquareVowels({a: 8, b: 6, c: 7, d: 5, e: 3, f: 0, g: 9}),
          {a: 64, b: 6, c: 7, d: 5, e: 9, f: 0, g: 9});
    });
});
