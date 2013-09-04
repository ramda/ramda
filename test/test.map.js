var assert = require("assert");
var Lib = require("./../ramda");

describe('map', function() {
    var map = Lib.map;
    var times2 = function(x) {return x * 2;};
    var add1 = function(x) {return x + 1;};

    it('should map simple functions over arrays', function() {
        assert.deepEqual(map(times2, [1, 2, 3, 4]), [2, 4, 6, 8]);
    });

    it('should be automatically curried', function() {
        var inc = map(add1);
        assert.deepEqual(inc([1, 2, 3]), [2, 3, 4]);
    });

    // TODO:  do we need to use a function constructor version of curry to make this work?
    it('should correctly report the arity of curried versions', function() {
        var inc = map(add1);
        assert.equal(inc.length, 1);
    });

});