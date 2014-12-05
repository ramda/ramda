var assert = require('assert');

var R = require('..');


describe('ifElse', function() {
    var t = function(a) { return a + 1; };
    var identity = function(a) { return a; };
    var isArray = function(a) { return Object.prototype.toString.call(a) === '[object Array]'; };

    it('calls the truth case function if the validator returns a truthy value', function() {
        var v = function(a) { return typeof a === 'number'; };
        assert.strictEqual(R.ifElse(v, t, identity)(10), 11);
    });

    it('calls the false case function if the validator returns a falsey value', function() {
        var v = function(a) { return typeof a === 'number'; };
        assert.strictEqual(R.ifElse(v, t, identity)('hello'), 'hello');
    });

    it('calls the true case on array items and the false case on non array items', function() {
        var list = [[1, 2, 3, 4, 5], 10, [0, 1], 15];
        var arrayToLength = R.map(R.ifElse(isArray, R.prop('length'), identity));
        assert.deepEqual(arrayToLength(list), [5, 10, 2, 15]);
    });

    it('passes the arguments to the true case function', function() {
        var v = function() { return true; };
        var onTrue = function(a, b) {
            assert.strictEqual(a, 123);
            assert.strictEqual(b, 'abc');
        };
        R.ifElse(v, onTrue, identity)(123, 'abc');
    });

    it('passes the arguments to the false case function', function() {
        var v = function() { return false; };
        var onFalse = function(a, b) {
            assert.strictEqual(a, 123);
            assert.strictEqual(b, 'abc');
        };
        R.ifElse(v, identity, onFalse)(123, 'abc');
    });

    it('returns a curried function', function() {
        var v = function(a) { return typeof a === 'number'; };
        var ifIsNumber = R.ifElse(v);
        assert.strictEqual(ifIsNumber(t, identity)(15), 16);
        assert.strictEqual(ifIsNumber(t, identity)('hello'), 'hello');
    });
});
