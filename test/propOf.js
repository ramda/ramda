var assert = require('assert');

var R = require('..');


describe('propOf', function() {
    var fred = {name: 'Fred', age: 23, feet: 'large'};

    it('returns a function that fetches the appropriate properties from the initially supplied object', function() {
        var p = R.propOf(fred);

        assert.strictEqual(p('name'), 'Fred');
        assert.strictEqual(p('age'), 23);
        assert.strictEqual(p('feet'), 'large');
        assert.strictEqual(p('nonexistent'), undefined);
    });
});
