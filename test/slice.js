var assert = require('assert');

var R = require('..');


describe('slice', function() {
    it('retrieves the proper sublist of a list', function() {
        var list = [8, 6, 7, 5, 3, 0, 9];
        assert.deepEqual(R.slice(2, 5, list), [7, 5, 3]);
    });
});
