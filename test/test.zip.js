var assert = require('assert');
var R = require('..');

describe('zipWith', function() {
    var a = [1, 2, 3], b = [100, 200, 300], c = [10, 20, 30, 40, 50, 60];
    var add = function(a, b) { return a + b; };
    var x = function(a, b) { return a * b; };
    var s = function(a, b) { return a + ' cow ' + b; };
    it('returns an array created by applying its passed-in function pair-wise on its passed in arrays', function() {
        assert.deepEqual(R.zipWith(add, a, b), [101, 202, 303]);
        assert.deepEqual(R.zipWith(x, a, b), [100, 400, 900]);
        assert.deepEqual(R.zipWith(s, a, b), ['1 cow 100', '2 cow 200', '3 cow 300']);
    });

    it('returns an array whose length is equal to the shorter of its input arrays', function() {
        assert.equal(R.zipWith(add, a, c).length, a.length);
    });
});

describe('zip', function() {
    it('returns an array of "tuples"', function() {
        var a = [1, 2, 3], b = [100, 200, 300];
        assert.deepEqual(R.zip(a, b), [[1, 100], [2, 200], [3, 300]]);
    });

    it('returns a list as long as the shorter of the lists input', function() {
        var a = [1, 2, 3], b = [100, 200, 300, 400], c = [10, 20];
        assert.deepEqual(R.zip(a, b), [[1, 100], [2, 200], [3, 300]]);
        assert.deepEqual(R.zip(a, c), [[1, 10], [2, 20]]);
    });
});

describe('zipObj', function() {
    it('combines an array of keys with an arrau of values into a single object', function() {
        assert.deepEqual(R.zipObj(['a', 'b', 'c'], [1, 2, 3]), {a: 1, b: 2, c: 3});
    });
    it('ignores extra values', function() {
        assert.deepEqual(R.zipObj(['a', 'b', 'c'], [1, 2, 3, 4, 5, 6, 7]), {a: 1, b: 2, c: 3});
    });
    it('extra keys are undefined', function() {
        assert.deepEqual(R.zipObj(['a', 'b', 'c', 'd', 'e', 'f'], [1, 2, 3]),
          {a: 1, b: 2, c: 3, d: undefined, e: undefined, f: undefined});
    });
    it('last one in wins when there are duplicate keys', function() {
        assert.deepEqual(R.zipObj(['a', 'b', 'c', 'a'], [1, 2, 3, 'LAST']), {a: 'LAST', b: 2, c: 3});
    });
});

describe('fromPairs', function() {
    it('combines an array of two-element arrays into an object', function() {
        assert.deepEqual(R.fromPairs([['a', 1], ['b', 2], ['c', 3]]), {a: 1, b: 2, c: 3});
    });
    it('skips empty Arrays and non-Array elements', function() {
        assert.deepEqual(R.fromPairs([['a', 1], 'x', [], ['b', 2], {}, ['c', 3]]), {a: 1, b: 2, c: 3});
    });
});

describe('toPairs', function() {
    it('converts an object into an array of two-element [key, value] arrays', function() {
        assert.deepEqual(R.toPairs({a: 1, b: 2, c: 3}), [['a', 1], ['b', 2], ['c', 3]]);
    });
    it("only iterates the object's own properties", function() {
        var F = function() {
            this.x = 1;
            this.y = 2;
        };
        F.prototype.protoProp = 'you can\'t see me';
        var f = new F();
        assert.deepEqual(R.toPairs(f), [['x', 1], ['y', 2]]);
    });
});

describe('toPairsIn', function() {
    it('converts an object into an array of two-element [key, value] arrays', function() {
        assert.deepEqual(R.toPairsIn({a: 1, b: 2, c: 3}), [['a', 1], ['b', 2], ['c', 3]]);
    });
    it("iterates properties on the object's prototype chain", function() {
        function sortPairs(a, b) {
            return a[0] > b[0] ? 1 : a[0] < b[0] ? -1 : 0;
        }
        var F = function() {
            this.x = 1;
            this.y = 2;
        };
        F.prototype.protoProp = 'you can see me';
        var f = new F();
        assert.deepEqual(R.toPairsIn(f).sort(sortPairs), [['protoProp', 'you can see me'], ['x', 1], ['y', 2]]);
    });
});
