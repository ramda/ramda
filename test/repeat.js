var assert = require('assert');

var R = require('..');


describe('repeat', function() {
    it('returns a lazy list of identical values', function() {
        assert.deepEqual(R.repeat(0, 5), [0, 0, 0, 0, 0]);
    });

    it('can accept any value, including `null`', function() {
        assert.deepEqual(R.repeat(null, 3), [null, null, null]);
    });

    it('is automatically curried', function() {
        var makeFoos = R.repeat('foo');
        assert.deepEqual(makeFoos(0), []);
        assert.deepEqual(makeFoos(3), ['foo', 'foo', 'foo']);
    });
});
