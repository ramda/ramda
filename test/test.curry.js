var assert = require('assert');
var R = require('./../ramda');
var curry = R.curry;

describe('curry', function() {
    function source(a, b, c) {
        return a * b * c;
    }
    var curried = curry(source);
    it('curry should curry', function() {
        assert.equal(curried(1)(2)(3), 6);
        assert.equal(curried(1, 2)(3), 6);
        assert.equal(curried(1)(2, 3), 6);
        assert.equal(curried(1, 2, 3), 6);
        assert.notEqual(curried, source);
    });

    it('curry should accept an arity', function() {
        var curried = curry(function(a, b, c, d) {
            return a * b * c;
        }, 3);
        assert.equal(curried(1)(2)(3), 6);
        assert.equal(curried(1, 2, 3), 6);
    });

    it('produces functions that throw when called with no arguments', function() {
        assert.throws(curried, TypeError);
        assert.throws(curried(1), TypeError);
        assert.throws(curried(1)(1), TypeError);
    });

});

describe('internal curry', function() {
    var map = R.map, filter = R.filter;

    it('should throw an expcetion given no arguments', function() {
        assert.throws(map);
        assert.throws(map(R.I));
        //doesnt throw an exception
        R.concat([]);
    });
});
