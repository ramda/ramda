var assert = require('assert');
var R = require('./../ramda');

describe('isEmpty', function() {
    var isEmpty = R.isEmpty;

    it('returns true if the list is empty', function() {
        assert.equal(isEmpty([]), true);
    });

    it('returns false if the list is not empty', function() {
        assert.equal(isEmpty(['']), false);
    });
});

describe('isAtom', function() {
    var isAtom = R.isAtom;
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
    var prepend = R.prepend;

    it('adds the element to the beginning of the list', function() {
        assert.deepEqual(prepend('x', ['y', 'z']), ['x', 'y', 'z']);
        assert.deepEqual(prepend(['a', 'z'], ['x', 'y']), [['a', 'z'], 'x', 'y']);
    });
});

describe('append', function() {
    var append = R.append;

    it('adds the element to the end of the list', function() {
        assert.deepEqual(append('z', ['x', 'y']), ['x', 'y', 'z']);
        assert.deepEqual(append(['a', 'z'], ['x', 'y']), ['x', 'y', ['a', 'z']]);
    });
});

describe('concat', function() {
    var concat = R.concat;

    it('adds combines the elements of the two lists', function() {
        assert.deepEqual(concat(['a', 'b'], ['c', 'd']), ['a', 'b', 'c', 'd']);
        assert.deepEqual(concat([], ['c', 'd']), ['c', 'd']);
    });

    var z1 = {
      x: 'z1',
      concat: function(that) { return this.x + ' ' + that.x; }
    };
    var z2 = { x: 'z2' };

    it('adds combines the elements of the two lists', function() {
        assert.deepEqual(concat(['a', 'b'], ['c', 'd']), ['a', 'b', 'c', 'd']);
        assert.deepEqual(concat([], ['c', 'd']), ['c', 'd']);
    });
    it('works for objects with a concat method', function() {
      assert.equal(concat('foo', 'bar'), 'foobar');
      assert.equal(concat(z1, z2), 'z1 z2');
    });
});

describe('head', function() {
    var head = R.head;

    it('returns undefined for an empty list', function() {
        assert.equal(typeof(head([])),  "undefined");
    });
    it('returns undefined for no arguments', function() {
        assert.equal(typeof(head()), "undefined");
    });
    it('returns the first element of a list', function() {
        assert.equal(head(['a', 'b', 'c', 'd']), 'a');
    });
});

describe('last', function() {
    var last = R.last;

    it('returns undefined for an empty list', function() {
        assert.equal(typeof(last([])),  "undefined");
    });
    it('returns undefined for no arguments', function() {
        assert.equal(typeof(last()), "undefined");
    });
    it('returns the first element of a list', function() {
        assert.equal(last(['a', 'b', 'c', 'd']), 'd');
    });
});

describe('tail', function() {
    var tail = R.tail;

    it('returns an empty list for an empty list', function() {
        assert.deepEqual(tail([]), []);
    });
    it('returns an empty list for no arguments', function() {
        assert.deepEqual(tail(), []);
    });
    it('returns a new list containing all the elements after the first element of a list', function() {
        assert.deepEqual(['b', 'c', 'd'], tail(['a', 'b', 'c', 'd']));
    });
});

describe('size', function() {
    var size = R.size;

    it('counts the elements of a list', function() {
        assert.equal(size(['a', 'b', 'c', 'd']), 4);
    });

    it('should be aliased by `length`', function() {
        assert.equal(R.length([2, 4, 6, 8, 10]), 5);
        assert.strictEqual(R.length, size);
    });

});

describe('sort', function() {
    var sort = R.sort;

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
    var comparator = R.comparator;
    it('builds a comparator function for sorting out of a simple predicate that reports whether the first param is smaller', function() {
        assert.deepEqual([3, 1, 8, 1, 2, 5].sort(comparator(function(a, b) {return a < b;})), [1, 1, 2, 3, 5, 8]);
    });
});
