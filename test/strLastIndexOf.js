var assert = require('assert');

var R = require('..');


describe('strLastIndexOf', function() {
    it('finds the index of a substring inside a string', function() {
        assert.strictEqual(R.strLastIndexOf('a', 'bananas'), 5);
    });

    it('returns -1 if the value is not found', function() {
        assert.strictEqual(R.strLastIndexOf('x', 'abcdefg'), -1);
    });

    it('is automatically curried', function() {
        var findA = R.strLastIndexOf('a');
        assert.strictEqual(findA('banana split'), 5);
    });
});
