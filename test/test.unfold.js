var assert = require("assert");
var Lib = require("./../ramda");

describe('unfoldr', function() {
    var unfoldr = Lib.unfoldr;

    it('should unfold simple functions with a starting point to create a list', function() {
        assert.deepEqual(unfoldr(function(n) {if (n > 0) {return [n, n - 1];}}, 10), [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
    });

    it('should just be cool!', function() {
        var fib = function(n) {var count = 0; return function(pair) {if (count++ < n) {return [pair[0], [pair[1], pair[0] + pair[1]]];}};};
        assert.deepEqual(unfoldr(fib(10), [0, 1]), [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]);
    });

});
