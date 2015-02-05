var assert = require('assert');

var R = require('..');


describe('unfold', function() {
    it('unfolds simple functions with a starting point to create a list', function() {
        assert.deepEqual(R.unfold(function(n) {if (n > 0) {return [n, n - 1];}}, 10), [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
    });

    it('is cool!', function() {
        var fib = function(n) {var count = 0; return function(pair) {if (count++ < n) {return [pair[0], [pair[1], pair[0] + pair[1]]];}};};
        assert.deepEqual(R.unfold(fib(10), [0, 1]), [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]);
    });

});
