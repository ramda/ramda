var assert = require('assert');

var R = require('..');


describe('remove', function() {
    it('splices out a sub-list of the given list', function() {
        var list = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
        assert.deepEqual(R.remove(2, 5, list), ['a', 'b', 'h', 'i', 'j']);
    });

    it('returns the appropriate sublist when start == 0', function() {
        var list = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
        assert.deepEqual(R.remove(0, 5, list), ['f', 'g', 'h', 'i', 'j']);
        assert.deepEqual(R.remove(0, 1, list), ['b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']);
        assert.deepEqual(R.remove(0, list.length, list), []);
    });

    it('removes the end of the list if the count is too large', function() {
        var list = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
        assert.deepEqual(R.remove(2, 20, list), ['a', 'b']);
    });

    it('retains the entire list if the start is too large', function() {
        var list = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
        assert.deepEqual(R.remove(13, 3, list), ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']);
    });

    it('is curried', function() {
        var list = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
        assert.deepEqual(R.remove(13)(3)(list), ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']);
        assert.deepEqual(R.remove(13, 3)(list), ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']);
    });
});
