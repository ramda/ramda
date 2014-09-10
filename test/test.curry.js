var assert = require('assert');
var R = require('..');

describe('curry', function() {
    function source(a, b, c) {
        return a * b * c;
    }
    var curried = R.curry(source);
    it('should curry', function() {
        assert.equal(curried(1)(2)(3), 6);
        assert.equal(curried(1, 2)(3), 6);
        assert.equal(curried(1)(2, 3), 6);
        assert.equal(curried(1, 2, 3), 6);
        assert.notEqual(curried, source);
    });

    it('produces functions that throw when called with no arguments', function() {
        assert.throws(curried, TypeError);
        assert.throws(curried(1), TypeError);
        assert.throws(curried(1)(1), TypeError);
    });

});

describe('curryN', function() {
    function source(a, b, c, d) {
        return a * b * c;
    }
    it('should accept an arity', function() {
        var curried = R.curryN(3, source);
        assert.equal(curried(1)(2)(3), 6);
        assert.equal(curried(1, 2)(3), 6);
        assert.equal(curried(1)(2, 3), 6);
        assert.equal(curried(1, 2, 3), 6);
    });
});

describe('internal curry', function() {
    it('should throw an exception given no arguments', function() {
        assert.throws(R.map);
        assert.throws(R.map(R.I));
        // doesnt throw an exception
        R.concat([]);
    });
});
