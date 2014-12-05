var assert = require('assert');

var R = require('..');


describe('converge', function() {
    var mult = function(a, b) {return a * b;};

    it('passes the results of applying the arguments individually to two separate functions into a single one', function() {
        assert.strictEqual(R.converge(mult, R.add(1), R.add(3))(2), 15); // mult(add1(2), add3(2)) = mult(3, 5) = 3 * 15;
    });
});
