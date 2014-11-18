var assert = require('assert');
var R = require('..');

describe('isEmpty', function() {
    it('returns true for null', function() {
        assert.strictEqual(R.isEmpty(null), true);
    });

    it('returns true for undefined', function() {
        assert.strictEqual(R.isEmpty(undefined), true);
        assert.strictEqual(R.isEmpty(), true);
    });

    it('returns true for empty string', function() {
        assert.strictEqual(R.isEmpty(''), true);
    });

    it('returns true for empty array', function() {
        assert.strictEqual(R.isEmpty([]), true);
    });

    it('returns true for empty arguments object', function() {
        assert.strictEqual(R.isEmpty((function() { return arguments; }())), true);
    });

    it('returns true for object with own length property whose value is 0', function() {
        assert.strictEqual(R.isEmpty({length: 0, x: 1, y: 2}), true);
    });

    it('returns true for object with inherited length property whose value is 0', function() {
        function Empty() {}
        Empty.prototype.length = 0;
        assert.strictEqual(R.isEmpty(new Empty()), true);
    });

    it('returns false for every other value', function() {
        assert.strictEqual(R.isEmpty(0), false);
        assert.strictEqual(R.isEmpty(NaN), false);
        assert.strictEqual(R.isEmpty(['']), false);
        assert.strictEqual(R.isEmpty({}), false);

        function Nonempty() {}
        Nonempty.prototype.length = 1;
        assert.strictEqual(R.isEmpty(new Nonempty()), false);
    });
});

describe('prepend', function() {
    it('adds the element to the beginning of the list', function() {
        assert.deepEqual(R.prepend('x', ['y', 'z']), ['x', 'y', 'z']);
        assert.deepEqual(R.prepend(['a', 'z'], ['x', 'y']), [['a', 'z'], 'x', 'y']);
    });

    it('works on empty list', function() {
        assert.deepEqual(R.prepend(1, []), [1]);
    });

    it('is curried', function() {
        assert.equal(typeof R.prepend(4), 'function');
        assert.deepEqual(R.prepend(4)([3, 2, 1]), [4, 3, 2, 1]);
    });

    it('throws on zero arguments', function() {
        assert.throws(R.prepend, TypeError);
    });
});

describe('prependTo', function() {
    it('adds the element to the beginning of the list', function() {
        assert.deepEqual(R.prependTo([4, 5, 6], 3), [3, 4, 5, 6]);
        assert.deepEqual(R.prependTo([4, 5, 6], [1, 2, 3]), [[1, 2, 3], 4, 5, 6]);
    });

    it('works on empty list', function() {
        assert.deepEqual(R.prependTo([], 1), [1]);
    });

    it('is curried', function() {
        assert.equal(typeof R.prependTo([]), 'function');
        assert.deepEqual(R.prependTo([3, 2, 1])(4), [4, 3, 2, 1]);
    });

    it('throws on zero arguments', function() {
        assert.throws(R.prependTo, TypeError);
    });
});

describe('append', function() {
    it('adds the element to the end of the list', function() {
        assert.deepEqual(R.append('z', ['x', 'y']), ['x', 'y', 'z']);
        assert.deepEqual(R.append(['a', 'z'], ['x', 'y']), ['x', 'y', ['a', 'z']]);
    });

    it('works on empty list', function() {
        assert.deepEqual(R.append(1, []), [1]);
    });

    it('is curried', function() {
        assert.equal(typeof R.append(4), 'function');
        assert.deepEqual(R.append(1)([4, 3, 2]), [4, 3, 2, 1]);
    });

    it('throws on zero arguments', function() {
        assert.throws(R.append, TypeError);
    });
});

describe('appendTo', function() {
    it('adds the element to the end of the list', function() {
        assert.deepEqual(R.appendTo([1, 2, 3], 4), [1, 2, 3, 4]);
        assert.deepEqual(R.appendTo([1, 2, 3], [4, 5, 6]), [1, 2, 3, [4, 5, 6]]);
    });

    it('works on empty list', function() {
        assert.deepEqual(R.appendTo([], 1), [1]);
    });

    it('is curried', function() {
        assert.equal(typeof R.appendTo([]), 'function');
        assert.deepEqual(R.appendTo([4, 3, 2])(1), [4, 3, 2, 1]);
    });

    it('throws on zero arguments', function() {
        assert.throws(R.appendTo, TypeError);
    });
});

describe('concat', function() {
    it('adds combines the elements of the two lists', function() {
        assert.deepEqual(R.concat(['a', 'b'], ['c', 'd']), ['a', 'b', 'c', 'd']);
        assert.deepEqual(R.concat([], ['c', 'd']), ['c', 'd']);
    });

    var z1 = {
        x: 'z1',
        concat: function(that) { return this.x + ' ' + that.x; }
    };
    var z2 = {
        x: 'z2'
    };

    it('adds combines the elements of the two lists', function() {
        assert.deepEqual(R.concat(['a', 'b'], ['c', 'd']), ['a', 'b', 'c', 'd']);
        assert.deepEqual(R.concat([], ['c', 'd']), ['c', 'd']);
    });
    it('works on strings', function() {
        assert.equal(R.concat('foo', 'bar'), 'foobar');
        assert.equal(R.concat('x', ''), 'x');
        assert.equal(R.concat('', 'x'), 'x');
        assert.equal(R.concat('', ''), '');
    });
    it('delegates to non-String object with a concat method, as second param', function() {
        assert.equal(R.concat(z1, z2), 'z1 z2');
    });
    it('is curried', function() {
        var conc123 = R.concat([1, 2, 3]);
        assert.deepEqual(conc123([4, 5, 6]), [1, 2, 3, 4, 5, 6]);
        assert.deepEqual(conc123(['a', 'b', 'c']), [1, 2, 3, 'a', 'b', 'c']);
    });
    it('throws if not an array, String, or object with a concat method', function() {
        assert.throws(function() { return R.concat({}, {}); }, TypeError);
    });
});

describe('nth', function() {
    var list = ['foo', 'bar', 'baz', 'quux'];

    it('accepts positive offsets', function() {
        assert.strictEqual(R.nth(0, list), 'foo');
        assert.strictEqual(R.nth(1, list), 'bar');
        assert.strictEqual(R.nth(2, list), 'baz');
        assert.strictEqual(R.nth(3, list), 'quux');
        assert.strictEqual(R.nth(4, list), undefined);
    });
    it('accepts negative offsets', function() {
        assert.strictEqual(R.nth(-1, list), 'quux');
        assert.strictEqual(R.nth(-2, list), 'baz');
        assert.strictEqual(R.nth(-3, list), 'bar');
        assert.strictEqual(R.nth(-4, list), 'foo');
        assert.strictEqual(R.nth(-5, list), undefined);
    });
    it('is curried', function() {
        assert.strictEqual(R.nth(0)(list), 'foo');
    });
    it('throws if applied to null or undefined', function() {
        assert.throws(function() { R.nth(0, null); }, TypeError);
        assert.throws(function() { R.nth(0, undefined); }, TypeError);
    });
});

describe('head', function() {
    it('returns undefined for an empty list', function() {
        assert.equal(typeof(R.head([])),  'undefined');
    });
    it('returns the first element of a list', function() {
        assert.equal(R.head(['a', 'b', 'c', 'd']), 'a');
    });
    it('throws if applied to null or undefined', function() {
        assert.throws(function() { R.head(null); }, TypeError);
        assert.throws(function() { R.head(undefined); }, TypeError);
        assert.throws(function() { R.head(); }, TypeError);
    });
});

describe('last', function() {
    it('returns undefined for an empty list', function() {
        assert.equal(typeof(R.last([])),  'undefined');
    });
    it('returns the first element of a list', function() {
        assert.equal(R.last(['a', 'b', 'c', 'd']), 'd');
    });
    it('throws if applied to null or undefined', function() {
        assert.throws(function() { R.last(null); }, TypeError);
        assert.throws(function() { R.last(undefined); }, TypeError);
        assert.throws(function() { R.last(); }, TypeError);
    });
});

describe('tail', function() {
    it('returns an empty list for an empty list', function() {
        assert.deepEqual(R.tail([]), []);
    });
    it('returns a new list containing all the elements after the first element of a list', function() {
        assert.deepEqual(['b', 'c', 'd'], R.tail(['a', 'b', 'c', 'd']));
    });
    it('throws if applied to null or undefined', function() {
        assert.throws(function() { R.tail(null); }, TypeError);
        assert.throws(function() { R.tail(undefined); }, TypeError);
        assert.throws(function() { R.tail(); }, TypeError);
    });
});

describe('size', function() {
    it('counts the elements of a list', function() {
        assert.equal(R.size(['a', 'b', 'c', 'd']), 4);
    });

    it('is aliased by `length`', function() {
        assert.strictEqual(R.length, R.size);
    });

});

describe('sort', function() {
    it('sorts the elements of a list', function() {
        assert.deepEqual(R.sort(function(a, b) {return a - b;}, [3, 1, 8, 1, 2, 5]), [1, 1, 2, 3, 5, 8]);
    });

    it('does not affect the list passed supplied', function() {
        var list = [3, 1, 8, 1, 2, 5];
        assert.deepEqual(R.sort(function(a, b) {return a - b;}, list), [1, 1, 2, 3, 5, 8]);
        assert.deepEqual(list, [3, 1, 8, 1, 2, 5]);
    });

    it('is automatically curried', function() {
        var sortByLength = R.sort(function(a, b) {return a.length - b.length;});
        assert.deepEqual(sortByLength(['one', 'two', 'three', 'four', 'five', 'six']),
                                      ['one', 'two', 'six', 'four', 'five', 'three']);
    });

    it('throws on zero arguments', function() {
        assert.throws(R.sort, TypeError);
    });
});

describe('comparator', function() {
    it('builds a comparator function for sorting out of a simple predicate that reports whether the first param is smaller', function() {
        assert.deepEqual([3, 1, 8, 1, 2, 5].sort(R.comparator(function(a, b) {return a < b;})), [1, 1, 2, 3, 5, 8]);
    });
});
