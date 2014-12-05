var assert = require('assert');

var R = require('..');


describe('chain', function() {
    it('maps a function over a nested list and returns the (shallow) flattened result', function() {
        var dbl = R.map(R.multiply(2));
        assert.deepEqual(R.chain(dbl, [[1, 2, 3], [1], [0, 10, -3, 5, 7]]), [2, 4, 6, 2, 0, 20, -6, 10, 14]);
        assert.deepEqual(R.chain(dbl, [[1, 2, 3], []]), [2, 4, 6]);
    });
});
