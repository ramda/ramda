var assert = require("assert");
var R = require("./../ramda");

describe('reverse', function() {
    var reverse = R.reverse;

    it('should reverse arrays', function() {
        assert.deepEqual(reverse([1, 2, 3, 4]), [4, 3, 2, 1]);
    });

    it('should return the empty list to itself', function() {
        assert.deepEqual(reverse([]), []);
    });

});
