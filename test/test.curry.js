var assert = require('assert');
var R = require('..');

describe('curry', function() {
    function source(a, b, c) {
        return a * b * c;
    }
    var curried = R.curry(source);
    it('curry should curry', function() {
        assert.equal(curried(1)(2)(3), 6);
        assert.equal(curried(1, 2)(3), 6);
        assert.equal(curried(1)(2, 3), 6);
        assert.equal(curried(1, 2, 3), 6);
        assert.notEqual(curried, source);
    });

    it('curry should accept an arity', function() {
        var curried = R.curry(function(a, b, c, d) {
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
    it('should throw an expcetion given no arguments', function() {
        assert.throws(R.map);
        assert.throws(R.map(R.I));
        //doesnt throw an exception
        R.concat([]);
    });
});
