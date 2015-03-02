var assert = require('assert');

var R = require('..');


describe('add', function() {
    it('adds together two numbers', function() {
        assert.strictEqual(R.add(3, 7), 10);
    });

    it('is automatically curried', function() {
        var incr = R.add(1);
        assert.strictEqual(incr(42), 43);
    });
});
