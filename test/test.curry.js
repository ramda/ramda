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
        void d;
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

describe('curry with placeholders', function() {
    function makeString(a, b, c, d) {
        return (String(a) + b + c + d) + (arguments.length > 4 ? ([].slice.call(arguments, 4)).join('') : '');
    }
    var curried = R.curry(makeString);
    it('should handle placeholders', function() {
        var lastX = curried(R.__, R.__, R.__, 'x');
        assert.equal(lastX('a', 'b', 'c'), 'abcx');

        var noop = lastX(R.__, R.__);
        assert.equal(noop('a', 'b', 'c'), 'abcx');

        var middle = curried(R.__, 'e', 'l');
        assert.equal(middle('h', 'p'), 'help');

        var ignoreMe = curried(R.__, R.__, R.__, R.__, R.__, R.__, 'haha');
        assert.equal(ignoreMe('a', 'b', 'c', 'd'), 'abcd');

        var firstY = lastX('y');
        assert.equal(firstY('a', 'b'), 'yabx');

        // extra args passed along
        assert.equal(curried('a', 'b', 'c', 'd', 'e', 'f'), 'abcdef');
        assert.equal(firstY('a', 'b', 'c', 'd'), 'yabxcd');
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
