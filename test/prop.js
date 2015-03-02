var assert = require('assert');

var R = require('..');


describe('prop', function() {
    var fred = {name: 'Fred', age: 23};

    it('returns a function that fetches the appropriate property', function() {
        var nm = R.prop('name');
        assert.strictEqual(typeof nm, 'function');
        assert.strictEqual(nm(fred), 'Fred');
    });

    it('is aliased by `get`', function() {
        assert.strictEqual(R.get, R.prop);
    });
});
