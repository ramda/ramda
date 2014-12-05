var assert = require('assert');

var R = require('..');


describe('split', function() {
    it('splits a string into an array', function() {
        assert.deepEqual(R.split('.', 'a.b.c.xyz.d'), ['a', 'b', 'c', 'xyz', 'd']);
    });

    it('the split string can be arbitrary', function() {
        assert.deepEqual(R.split('at', 'The Cat in the Hat sat on the mat'), ['The C', ' in the H', ' s', ' on the m', '']);
    });
});
