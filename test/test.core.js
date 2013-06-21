var assert = require('assert');
var Lib = require('./../ramda');

describe('isEmpty', function() {
    var isEmpty = Lib.isEmpty;

    it('returns true if the list is empty', function() {
        assert.equal(isEmpty([]), true);
    });

    it('returns false if the list is not empty', function() {
        assert.equal(isEmpty(['']), false);
    });
});

describe('prepend', function() {
    var prepend = Lib.prepend;

    it('adds the element to the beginning of the list', function() {
        assert.deepEqual(prepend('x', ['y', 'z']), ['x', 'y', 'z']);
    });
});

describe('append', function() {
    var append = Lib.append;

    it('adds the element to the end of the list', function() {
        assert.deepEqual(append('z', ['x', 'y']), ['x', 'y', 'z']);
    });
});

describe('merge', function() {
    var merge = Lib.merge;

    it('adds combines the elements of the two lists', function() {
        assert.deepEqual(merge(['a', 'b'], ['c', 'd']), ['a', 'b', 'c', 'd']);
    });
});

describe('head', function() {
    var head = Lib.head;

    it('returns the first element of a list', function() {
        assert.equal(head(['a', 'b', 'c', 'd']), 'a');
    });
});

describe('tail', function() {
    var tail = Lib.tail;

    it('returns a new list containing all the elements after the first element of a list', function() {
        assert.deepEqual(['b', 'c', 'd'], tail(['a', 'b', 'c', 'd']));
    });
});

describe('size', function() {
    var size = Lib.size;

    it('counts the elements of a list', function() {
        assert.equal(size(['a', 'b', 'c', 'd']), 4);
    });
});

