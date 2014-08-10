var assert = require('assert');
var R = require('./../ramda');

describe('join', function () {
    it("concatenates a list's elements to a string, with an seperator string between elements", function () {
        var list = [1, 2, 3, 4];
        assert.equal(R.join('~', list), '1~2~3~4');
    });
});

describe('remove', function () {
    var remove = R.remove;

    it('splices out a sub-list of the given list', function() {
        var list = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
        assert.deepEqual(remove(2, 5, list), ['a', 'b', 'h', 'i', 'j']);
    });

    it('returns the appropriate sublist when start == 0', function() {
        var list = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
        assert.deepEqual(remove(0, 5, list), ['f', 'g', 'h', 'i', 'j']);
        assert.deepEqual(remove(0, 1, list), ['b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']);
        assert.deepEqual(remove(0, list.length, list), []);
    });

    it('removes the end of the list if the count is too large', function() {
        var list = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
        assert.deepEqual(remove(2, 20, list), ['a', 'b']);
    });

    it('retains the entire list if the start is too large', function() {
        var list = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
        assert.deepEqual(remove(13, 3, list), ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']);
    });

    it('should be curried', function() {
        var list = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
        assert.deepEqual(remove(13)(3)(list), ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']);
        assert.deepEqual(remove(13, 3)(list), ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']);
    });
});

describe('insert', function () {
    var insert = R.insert;
    it('inserts an element into the given list', function() {
        var list = ['a', 'b', 'c', 'd', 'e'];
        assert.deepEqual(insert(2, 'x', list), ['a', 'b', 'x', 'c', 'd', 'e']);
    });

    it('inserts another list as an element', function() {
        var list = ['a', 'b', 'c', 'd', 'e'];
        assert.deepEqual(insert(2, ['s', 't'], list), ['a', 'b', ['s', 't'], 'c', 'd', 'e']);
    });

    it('appends to the end of the list if the index is too large', function() {
        var list = ['a', 'b', 'c', 'd', 'e'];
        assert.deepEqual(insert(8, 'z', list), ['a', 'b', 'c', 'd', 'e', 'z']);
    });

    it('should be curried', function() {
        var list = ['a', 'b', 'c', 'd', 'e'];
        assert.deepEqual(insert(8)('z')(list), ['a', 'b', 'c', 'd', 'e', 'z']);
        assert.deepEqual(insert(8, 'z')(list), ['a', 'b', 'c', 'd', 'e', 'z']);
    });
});


describe('insert.all', function () {
    var insert = R.insert;
    it('inserts a list of elements into the given list', function() {
        var list = ['a', 'b', 'c', 'd', 'e'];
        assert.deepEqual(insert.all(2, ['x', 'y', 'z'], list), ['a', 'b', 'x', 'y', 'z', 'c', 'd', 'e']);
    });

    it('appends to the end of the list if the index is too large', function() {
        var list = ['a', 'b', 'c', 'd', 'e'];
        assert.deepEqual(insert.all(8, ['p', 'q', 'r'], list), ['a', 'b', 'c', 'd', 'e', 'p', 'q', 'r']);
    });

    it('should be curried', function() {
        var list = ['a', 'b', 'c', 'd', 'e'];
        assert.deepEqual(insert.all(8)(['p', 'q', 'r'], list), ['a', 'b', 'c', 'd', 'e', 'p', 'q', 'r']);
    });
});


describe('slice', function () {
    it('retrieves the proper sublist of a list', function () {
        var list = [8, 6, 7, 5, 3, 0, 9];
        assert.deepEqual(R.slice(2, 5, list), [7, 5, 3]);
    });

    // TODO
    // it('retturn undefined if the paramters don't make sense', function() {
    //   var list = [8, 6, 7, 5, 3, 0, 9];
    //   assert.equal(typeof(R.slice(5, 2, list)), 'undefined');
    // });
});

describe('slice.from', function () {
    it('retrieves the proper suffix sublist of a list starting with the desired index', function () {
        var list = [8, 6, 7, 5, 3, 0, 9];
        assert.deepEqual(R.slice.from(2, list), [7, 5, 3, 0, 9]);
    });
});

describe('nth', function () {
    it('returns the object at position n of the list', function () {
        var list = ['x', 1, {a: 1, b: 2}, [4, 5, 6], true];
        assert.equal(R.nth(4, list), true);
        assert.equal(R.nth(0, list), 'x');
        assert.deepEqual(R.nth(3, list), [4, 5, 6]);
    });

    it("returns null if n is out of the list's range", function () {
        var list = [1, 2, 3];
        assert.equal(R.nth(4, list), undefined);
    });

    it('is automatically curried', function () {
        var list = [3, 4, 5, 6, 7, 8];
        var get3rd = R.nth(2);
        assert.equal(get3rd(list), 5);
    });
});

describe('times', function() {
    var times = R.times;

    it('takes a map func', function() {
        assert.deepEqual(times(R.identity, 5), [0, 1, 2, 3, 4]);
        assert.deepEqual(times(function(x) {
            return x * 2;
        }, 5), [0, 2, 4, 6, 8]);
    });

    it('is curried', function() {
        var mapid = times(R.identity);
        assert.deepEqual(mapid(5), [0, 1, 2, 3, 4]);
    });
});

describe('repeatN', function () {
    var repeatN = R.repeatN;

    it('returns a lazy list of identical values', function () {
        assert.deepEqual(repeatN(0, 5), [0, 0, 0, 0, 0]);
    });

    it('can accept any value, including `null`', function () {
        assert.deepEqual(repeatN(null, 3), [null, null, null]);
    });

    it('is automatically curried', function () {
        var nTrues = repeatN(true);
        assert.deepEqual(nTrues(4), [true, true, true, true]);
    });
});

describe('of', function() {
    var of = R.of;

    it('returns its argument as an Array', function() {
        assert.deepEqual(of(100), [100]);
        assert.deepEqual(of([100]), [[100]]);
        assert.deepEqual(of(null), [null]);
        assert.deepEqual(of(undefined), [undefined]);
        assert.deepEqual(of([]), [[]]);
    });
});

describe('empty', function() {
    var empty = R.empty;
    it('returns an empty list', function() {
        assert.deepEqual(empty([1,2,3]), []);
    });

});

describe('chain', function() {
    var chain = R.chain;
    var dbl = R.map(R.multiply(2));
    it('maps a function over a nested list and returns the (shallow) flattened result', function() {
        assert.deepEqual(chain(dbl, [[1,2,3], [1], [0, 10, -3, 5, 7]]), [2, 4, 6, 2, 0, 20, -6, 10, 14]);
        assert.deepEqual(chain(dbl, [[1,2,3], []]), [2, 4, 6]);
    });
});
