var assert = require('assert');

var _ = require('../../src/__');
var _curry2 = require('../../src/internal/_curry2');


describe('_curry2', function() {
    it('supports R.__ placeholder', function() {
        var f = function(a, b) { return [a, b]; };
        var g = _curry2(f);

        assert.deepEqual(g(1)(2), [1, 2]);
        assert.deepEqual(g(1, 2), [1, 2]);

        assert.deepEqual(g(_, 2)(1), [1, 2]);
        assert.deepEqual(g(1, _)(2), [1, 2]);

        assert.deepEqual(g(_, _)(1)(2), [1, 2]);
        assert.deepEqual(g(_, _)(1, 2), [1, 2]);
        assert.deepEqual(g(_, _)(_)(1, 2), [1, 2]);
        assert.deepEqual(g(_, _)(_, 2)(1), [1, 2]);
    });
});
