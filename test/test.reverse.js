var assert = require('assert');
var R = require('..');

describe('reverse', function() {
    it('should reverse arrays', function() {
        assert.deepEqual(R.reverse([1, 2, 3, 4]), [4, 3, 2, 1]);
    });

    it('should return the empty list to itself', function() {
        assert.deepEqual(R.reverse([]), []);
    });

});
