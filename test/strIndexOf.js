var assert = require('assert');

var R = require('..');


describe('strIndexOf', function() {
    it('finds the index of a substring inside a string', function() {
        assert.strictEqual(R.strIndexOf('c', 'abcdefg'), 2);
    });

    it('returns -1 if the value is not found', function() {
        assert.strictEqual(R.strIndexOf('x', 'abcdefg'), -1);
    });

    it('is automatically curried', function() {
        var findD = R.strIndexOf('d');
        assert.strictEqual(findD('abcdefg'), 3);
    });
});
