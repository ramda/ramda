var assert = require('assert');
var R = require('..');

describe('join', function() {
    it("concatenates a list's elements to a string, with an seperator string between elements", function() {
        var list = [1, 2, 3, 4];
        assert.equal(R.join('~', list), '1~2~3~4');
    });
});

describe('remove', function() {
    it('splices out a sub-list of the given list', function() {
        var list = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
        assert.deepEqual(R.remove(2, 5, list), ['a', 'b', 'h', 'i', 'j']);
    });

    it('returns the appropriate sublist when start == 0', function() {
        var list = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
        assert.deepEqual(R.remove(0, 5, list), ['f', 'g', 'h', 'i', 'j']);
        assert.deepEqual(R.remove(0, 1, list), ['b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']);
        assert.deepEqual(R.remove(0, list.length, list), []);
    });

    it('removes the end of the list if the count is too large', function() {
        var list = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
        assert.deepEqual(R.remove(2, 20, list), ['a', 'b']);
    });

    it('retains the entire list if the start is too large', function() {
        var list = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
        assert.deepEqual(R.remove(13, 3, list), ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']);
    });

    it('is curried', function() {
        var list = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
        assert.deepEqual(R.remove(13)(3)(list), ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']);
        assert.deepEqual(R.remove(13, 3)(list), ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']);
    });
});

describe('insert', function() {
    it('inserts an element into the given list', function() {
        var list = ['a', 'b', 'c', 'd', 'e'];
        assert.deepEqual(R.insert(2, 'x', list), ['a', 'b', 'x', 'c', 'd', 'e']);
    });

    it('inserts another list as an element', function() {
        var list = ['a', 'b', 'c', 'd', 'e'];
        assert.deepEqual(R.insert(2, ['s', 't'], list), ['a', 'b', ['s', 't'], 'c', 'd', 'e']);
    });

    it('appends to the end of the list if the index is too large', function() {
        var list = ['a', 'b', 'c', 'd', 'e'];
        assert.deepEqual(R.insert(8, 'z', list), ['a', 'b', 'c', 'd', 'e', 'z']);
    });

    it('is curried', function() {
        var list = ['a', 'b', 'c', 'd', 'e'];
        assert.deepEqual(R.insert(8)('z')(list), ['a', 'b', 'c', 'd', 'e', 'z']);
        assert.deepEqual(R.insert(8, 'z')(list), ['a', 'b', 'c', 'd', 'e', 'z']);
    });
});


describe('insert.all', function() {
    it('inserts a list of elements into the given list', function() {
        var list = ['a', 'b', 'c', 'd', 'e'];
        assert.deepEqual(R.insert.all(2, ['x', 'y', 'z'], list), ['a', 'b', 'x', 'y', 'z', 'c', 'd', 'e']);
    });

    it('appends to the end of the list if the index is too large', function() {
        var list = ['a', 'b', 'c', 'd', 'e'];
        assert.deepEqual(R.insert.all(8, ['p', 'q', 'r'], list), ['a', 'b', 'c', 'd', 'e', 'p', 'q', 'r']);
    });

    it('is curried', function() {
        var list = ['a', 'b', 'c', 'd', 'e'];
        assert.deepEqual(R.insert.all(8)(['p', 'q', 'r'], list), ['a', 'b', 'c', 'd', 'e', 'p', 'q', 'r']);
    });
});


describe('slice', function() {
    it('retrieves the proper sublist of a list', function() {
        var list = [8, 6, 7, 5, 3, 0, 9];
        assert.deepEqual(R.slice(2, 5, list), [7, 5, 3]);
    });

    // TODO
    // it('retturn undefined if the paramters don't make sense', function() {
    //   var list = [8, 6, 7, 5, 3, 0, 9];
    //   assert.equal(typeof(R.slice(5, 2, list)), 'undefined');
    // });
});

describe('slice.from', function() {
    it('retrieves the proper suffix sublist of a list starting with the desired index', function() {
        var list = [8, 6, 7, 5, 3, 0, 9];
        assert.deepEqual(R.slice.from(2, list), [7, 5, 3, 0, 9]);
    });
});

describe('times', function() {
    it('takes a map func', function() {
        assert.deepEqual(R.times(R.identity, 5), [0, 1, 2, 3, 4]);
        assert.deepEqual(R.times(function(x) {
            return x * 2;
        }, 5), [0, 2, 4, 6, 8]);
    });

    it('is curried', function() {
        var mapid = R.times(R.identity);
        assert.deepEqual(mapid(5), [0, 1, 2, 3, 4]);
    });
});

describe('repeatN', function() {
    it('returns a lazy list of identical values', function() {
        assert.deepEqual(R.repeatN(0, 5), [0, 0, 0, 0, 0]);
    });

    it('can accept any value, including `null`', function() {
        assert.deepEqual(R.repeatN(null, 3), [null, null, null]);
    });

    it('is automatically curried', function() {
        var nTrues = R.repeatN(true);
        assert.deepEqual(nTrues(4), [true, true, true, true]);
    });
});

describe('of', function() {
    it('returns its argument as an Array', function() {
        assert.deepEqual(R.of(100), [100]);
        assert.deepEqual(R.of([100]), [[100]]);
        assert.deepEqual(R.of(null), [null]);
        assert.deepEqual(R.of(undefined), [undefined]);
        assert.deepEqual(R.of([]), [[]]);
    });
});

describe('empty', function() {
    it('returns an empty list', function() {
        assert.deepEqual(R.empty([1, 2, 3]), []);
    });

});

describe('chain', function() {
    it('maps a function over a nested list and returns the (shallow) flattened result', function() {
        var dbl = R.map(R.multiply(2));
        assert.deepEqual(R.chain(dbl, [[1, 2, 3], [1], [0, 10, -3, 5, 7]]), [2, 4, 6, 2, 0, 20, -6, 10, 14]);
        assert.deepEqual(R.chain(dbl, [[1, 2, 3], []]), [2, 4, 6]);
    });
});
