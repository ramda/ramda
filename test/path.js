var assert = require('assert');

var R = require('..');


describe('path', function() {
    var deepObject = {a: {b: {c: 'c'}}, falseVal: false, nullVal: null, undefinedVal: undefined, arrayVal: ['arr']};
    it('takes a path and an object and returns the value at the path or undefined', function() {
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
        assert.strictEqual(R.path(['a', 'b', 'c'], obj), 100);
        assert.strictEqual(R.path([], obj), undefined);
        assert.strictEqual(R.path(['a', 'e', 'f', '1'], obj), 101);
        assert.strictEqual(R.path(['j', '0'], obj), 'J');
        assert.strictEqual(R.path(['j', '1'], obj), undefined);
        assert.strictEqual(R.path(['a', 'b', 'c'], null), undefined);
    });

    it("gets a deep property's value from objects", function() {
        assert.strictEqual(R.path(['a', 'b', 'c'], deepObject), 'c');
        assert.strictEqual(R.path(['a'], deepObject), deepObject.a);
    });

    it('returns undefined for items not found', function() {
        assert.strictEqual(R.path(['a', 'b', 'foo'], deepObject), undefined);
        assert.strictEqual(R.path(['bar'], deepObject), undefined);
    });

    it('returns undefined for null/undefined', function() {
        assert.strictEqual(R.path(['toString'], null), undefined);
        assert.strictEqual(R.path(['toString'], undefined), undefined);
    });

    it('works with falsy items', function() {
        assert.strictEqual(R.path(['toString'], false), Boolean.prototype.toString);
    });

    it('is curried', function() {
        assert.strictEqual(R.path(['arrayVal', '0'])(deepObject), 'arr');
    });
});
