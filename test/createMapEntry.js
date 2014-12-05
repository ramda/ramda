var assert = require('assert');

var R = require('..');


describe('createMapEntry', function() {
    it('creates an object containing a single key:value pair', function() {
        assert.deepEqual(R.createMapEntry('foo', 42), {foo: 42});
    });

    it('is automatically curried', function() {
        assert.deepEqual(R.createMapEntry('foo')(42), {foo: 42});
    });
});
