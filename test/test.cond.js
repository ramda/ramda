var assert = require('assert');
var R = require('..');

describe('cond', function() {
    var t = function(a) { return a + 1; };
    var identity = function(a) { return a; };

    it('should call the truth case function if the validator returns a truthy value', function() {
        var v = function(a) { return typeof a === 'number'; };
        assert.equal(R.cond(v, t, identity)(10), 11);
    });

    it('should call the false case function if the validator returns a falsey value', function() {
        var v = function(a) { return typeof a === 'number'; };
        assert.equal(R.cond(v, t, identity)('hello'), 'hello');
    });

    it('should return a curried function', function() {
        var v = function(a) { return typeof a === 'number'; };
        var ifIsNumber = R.cond(v);
        assert.equal(ifIsNumber(t, identity)(15), 16);
        assert.equal(ifIsNumber(t, identity)('hello'), 'hello');
    });
});

