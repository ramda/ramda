var assert = require('assert');
var Lib = require('./../ramda');

describe('indexOf', function () {
    it("returns a number indicating an object's position in a list", function () {
        var list = [0, 10, 20, 30];
        assert.equal(Lib.indexOf(30, list), 3);
    });
    it('returns -1 if the object is not in the list', function () {
        var list = [0, 10, 20, 30];
        assert.equal(Lib.indexOf(40, list), -1);
    });
});

describe('lastIndexOf', function () {
    it("returns a number indicating an object's last position in a list", function () {
        var list = [0, 10, 20, 30, 0, 10, 20, 30, 0, 10];
        assert.equal(Lib.lastIndexOf(30, list), 7);
    });
    it('returns -1 if the object is not in the list', function () {
        var list = [0, 10, 20, 30];
        assert.equal(Lib.lastIndexOf(40, list), -1);
    });

});

describe('join', function () {
    it("concatenates a list's elements to a string, with an seperator string between elements", function () {
        var list = [1, 2, 3, 4];
        assert.equal(Lib.join('~', list), '1~2~3~4');
    });
});

describe('remove', function () {
    var remove = Lib.remove;
    it('splices out a sub-list of the given list', function() {
        var list = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
        assert.deepEqual(remove(2, 5, list), ['a', 'b', 'h', 'i', 'j']);
    });

    it('removes the end of the list if the count is too large', function() {
        var list = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
        assert.deepEqual(remove(2, 20, list), ['a', 'b']);
    });

    it('retains the entire list if the start is too large', function() {
        var list = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
        assert.deepEqual(remove(13, 3, list), ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']);
    });
});

describe('insert', function () {
    var insert = Lib.insert;
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
});


describe('insert.all', function () {
    var insert = Lib.insert;
    it('inserts a list of elements into the given list', function() {
        var list = ['a', 'b', 'c', 'd', 'e'];
        assert.deepEqual(insert.all(2, ['x', 'y', 'z'], list), ['a', 'b', 'x', 'y', 'z', 'c', 'd', 'e']);
    });

    it('appends to the end of the list if the index is too large', function() {
        var list = ['a', 'b', 'c', 'd', 'e'];
        assert.deepEqual(insert.all(8, ['p', 'q', 'r'], list), ['a', 'b', 'c', 'd', 'e', 'p', 'q', 'r']);
    });
});


describe('slice', function () {
    it('retrieves the proper sublist of a list', function () {
        var list = [8, 6, 7, 5, 3, 0, 9];
        assert.deepEqual(Lib.slice(2, 5, list), [7, 5, 3]);
    });

    // TODO
    // it('retturn undefined if the paramters don't make sense', function() {
    //   var list = [8, 6, 7, 5, 3, 0, 9];
    //   assert.equal(typeof(Lib.slice(5, 2, list)), 'undefined');
    // });
});

describe('slice.from', function () {
    it('retrieves the proper suffix sublist of a list starting with the desired index', function () {
        var list = [8, 6, 7, 5, 3, 0, 9];
        assert.deepEqual(Lib.slice.from(2, list), [7, 5, 3, 0, 9]);
    });
});

describe('nth', function () {
    it('returns the object at position n of the list', function () {
        var list = ['x', 1, {a: 1, b: 2}, [4, 5, 6], true];
        assert.equal(Lib.nth(4, list), true);
        assert.equal(Lib.nth(0, list), 'x');
        assert.deepEqual(Lib.nth(3, list), [4, 5, 6]);
    });

    it("returns null if n is out of the list's range", function () {
        var list = [1, 2, 3];
        assert.equal(Lib.nth(4, list), null);
    });

    it('is automatically curried', function () {
        var list = [3, 4, 5, 6, 7, 8];
        var get3rd = Lib.nth(2);
        assert.equal(get3rd(list), 5);
    });
});

describe('repeatN', function () {
    var repeatN = Lib.repeatN;

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

