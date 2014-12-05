var assert = require('assert');

var R = require('..');


describe('insertAll', function() {
    it('inserts a list of elements into the given list', function() {
        var list = ['a', 'b', 'c', 'd', 'e'];
        assert.deepEqual(R.insertAll(2, ['x', 'y', 'z'], list), ['a', 'b', 'x', 'y', 'z', 'c', 'd', 'e']);
    });

    it('appends to the end of the list if the index is too large', function() {
        var list = ['a', 'b', 'c', 'd', 'e'];
        assert.deepEqual(R.insertAll(8, ['p', 'q', 'r'], list), ['a', 'b', 'c', 'd', 'e', 'p', 'q', 'r']);
    });

    it('is curried', function() {
        var list = ['a', 'b', 'c', 'd', 'e'];
        assert.deepEqual(R.insertAll(8)(['p', 'q', 'r'], list), ['a', 'b', 'c', 'd', 'e', 'p', 'q', 'r']);
    });
});
