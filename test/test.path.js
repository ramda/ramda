var assert = require('assert');
var R = require('..');

describe('path', function() {
    var deepObject = {a: {b: {c: 'c'}}, falseVal: false, nullVal: null, undefinedVal: undefined, arrayVal: ['arr']};
    it('takes a dot-delimited path and an object and returns the value at the path or undefined', function() {
        var obj = {
            a: {
                b: {
                    c: 100,
                    d: 200
                },
                e: {
                    f: [100, 101, 102],
                    g: 'G'
                },
                h: 'H'
            },
            i: 'I',
            j: ['J']
        };
        assert.strictEqual(R.path('a.b.c', obj), 100);
        assert.strictEqual(R.path('', obj), undefined);
        assert.strictEqual(R.path('a.e.f.1', obj), 101);
        assert.strictEqual(R.path('j.0', obj), 'J');
        assert.strictEqual(R.path('j.1', obj), undefined);
        assert.strictEqual(R.path('a.b.c', null), undefined);
    });

    it("gets a deep property's value from objects", function() {
        assert.strictEqual(R.path('a.b.c', deepObject), 'c');
        assert.strictEqual(R.path('a', deepObject), deepObject.a);
    });

    it('returns undefined for items not found', function() {
        assert.strictEqual(R.path('a.b.foo', deepObject), undefined);
        assert.strictEqual(R.path('bar', deepObject), undefined);
    });

    it('returns undefined for null/undefined', function() {
        assert.strictEqual(R.path('toString', null), undefined);
        assert.strictEqual(R.path('toString', undefined), undefined);
    });

    it('works with falsy items', function() {
        assert.strictEqual(R.path('toString', false), Boolean.prototype.toString);
    });

    it('is curried', function() {
        assert.strictEqual(R.path('arrayVal.0')(deepObject), 'arr');
    });
});

describe('pathOn', function() {
    var deepObject = {a: {b: {c: 'c'}}, falseVal: false, nullVal: null, undefinedVal: undefined, arrayVal: ['arr']};
    it('takes a string separator, string path, and an object and returns the value at the path or undefined', function() {
        var obj = {
            a: {
                b: {
                    c: 100,
                    d: 200
                },
                e: {
                    f: [100, 101, 102],
                    g: 'G'
                },
                h: 'H'
            },
            i: 'I',
            j: ['J']
        };
        assert.strictEqual(R.pathOn('|', 'a|b|c', obj), 100);
        assert.strictEqual(R.pathOn(' ', '', obj), undefined);
        assert.strictEqual(R.pathOn(' ', 'a e f 1', obj), 101);
        assert.strictEqual(R.pathOn('_', 'j_0', obj), 'J');
        assert.strictEqual(R.pathOn('~', 'j~1', obj), undefined);
        assert.strictEqual(R.pathOn('Z', 'aZbZc', null), undefined);
    });

    it("gets a deep property's value from objects", function() {
        assert.strictEqual(R.pathOn('|', 'a|b|c', deepObject), 'c');
        assert.strictEqual(R.pathOn('|', 'a', deepObject), deepObject.a);
    });
});

describe('pathEq', function() {

    var obj = {
        a: 1,
        b: {
            ba: '2'
        }
    };

    it('returns true if the path matches the value', function() {
        assert.ok(R.pathEq('a', 1, obj));
        assert.ok(R.pathEq('b.ba', '2', obj));
    });

    it('returns false for non matches', function() {
        assert.ok(!R.pathEq('a', '1', obj));
        assert.ok(!R.pathEq('b.ba', 2, obj));
    });

    it('returns false for non existing values', function() {
        assert.ok(!R.pathEq('c', 'foo', obj));
        assert.ok(!R.pathEq('c.d', 'foo', obj));
    });

});

/*
describe('pathWith', function() {
    var obj = {
      a: {
        b: {
          c: 100,
          d: 200
        },
        e: {
          f: [100, 101, 102],
          g: 'G'
        },
        h: 'H'
      },
      i: 'I',
      j: ['J']
    };
    it('takes a function, a string path, and an object, and returns the value at that path or undefined.', function() {

        var everyThirdChar = function(str) {
            var parts = [];
            var i = -1;
            while (++i < str.length) {
                if (i % 3 === 0) {
                    parts.push(str.charAt(i));
                }
            }
            return parts;
        };
        var path = 'axxbyyc';

        assert.strictEqual(R.pathWith(everyThirdChar, 'azsbt5c', obj), 100);
        assert.strictEqual(R.pathWith(everyThirdChar, '', obj), undefined);
        assert.strictEqual(R.pathWith(everyThirdChar, 'axxeaafaa1', obj), 101);
        assert.strictEqual(R.pathWith(everyThirdChar, 'j__0', obj), 'J');
        assert.strictEqual(R.pathWith(everyThirdChar, 'j__1', obj), undefined);
        assert.strictEqual(R.pathWith(everyThirdChar, 'azsbt5c', null), undefined);
    });

    function squareBrackets(path) {
        return ('' + path).replace(/\[(.*?)\]/g, function (m, path) { //handle case where [1] or ['xa'] may occur
            return '.' + path.replace(/^["']|["']$/g, ''); //strip quotes at the start or end of the key
        }).split('.');
    }

    it('takes a function accepting a string returnign an array for path', function() {
        assert.strictEqual(R.pathWith(squareBrackets, "a['b']['c']", obj), 100);
    });
});
*/
