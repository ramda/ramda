var assert = require('assert');

var R = require('..');


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
