var assert = require('assert');
var Lib = require('./../ramda');
var curry = Lib.curry;

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
    var map = Lib.map, filter = Lib.filter;

    it('should throw an expcetion given no arguments', function() {
        assert.throws(map);
        assert.throws(map(Lib.I));
        //doesnt throw an exception
        Lib.concat([]);
    });
});

