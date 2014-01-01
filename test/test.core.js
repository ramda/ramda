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

describe('isAtom', function() {
    var isAtom = Lib.isAtom;
    it('is false for Arrays', function() {
        assert.equal(isAtom([]), false);
        assert.equal(isAtom([1, 2, 3, 4]), false);
    });
    it('is false for undefined and null', function() {
        assert.equal(isAtom(), false);
        assert.equal(isAtom(null), false);
    });
    
    it('is true for primitive values', function() {
        assert.equal(isAtom(1), true);
        assert.equal(isAtom('a'), true);
        assert.equal(isAtom({}), true);
        assert.equal(isAtom(true), true);
        assert.equal(isAtom(false), true);
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
        assert.deepEqual(merge([], ['c', 'd']), ['c', 'd']);
    });
});

describe('head', function() {
    var head = Lib.head;

    it('returns null for an empty list', function() {
        assert.equal(head([]), null);
    });
    it('returns null for no arguments', function() {
        assert.equal(head(), null);
    });
    it('returns the first element of a list', function() {
        assert.equal(head(['a', 'b', 'c', 'd']), 'a');
    });
});

describe('tail', function() {
    var tail = Lib.tail;

    it('returns null for an empty list', function() {
        assert.equal(tail([]), null);
    });
    it('returns null for no arguments', function() {
        assert.equal(tail(), null);
    });
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

describe('sort', function() {
    var sort = Lib.sort;

    it('sorts the elements of a list', function() {
        assert.deepEqual(sort(function(a, b) {return a - b;}, [3, 1, 8, 1, 2, 5]), [1, 1, 2, 3, 5, 8]);
    });

    it('does not affect the list passed supplied', function() {
        var list = [3, 1, 8, 1, 2, 5];
        assert.deepEqual(sort(function(a, b) {return a - b;}, list), [1, 1, 2, 3, 5, 8]);
        assert.deepEqual(list, [3, 1, 8, 1, 2, 5]);
    });

    it('is automatically curried', function() {
        var sortByLength = sort(function(a, b) {return a.length - b.length;});
        assert.deepEqual(sortByLength(["one", "two", "three", "four", "five", "six"]),
                                      ["one", "two", "six", "four", "five", "three"]);
    });
});

describe('comparator', function() {
    var comparator = Lib.comparator;
    it('builds a comparator function for sorting out of a simple predicate that reports whether the first param is smaller', function() {
        assert.deepEqual([3, 1, 8, 1, 2, 5].sort(comparator(function(a, b) {return a < b;})), [1, 1, 2, 3, 5, 8]);
    });
});

