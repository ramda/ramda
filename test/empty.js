var assert = require('assert');

var R = require('..');


describe('empty', function() {
    it('returns an empty list', function() {
        assert.deepEqual(R.empty([1, 2, 3]), []);
    });

});
