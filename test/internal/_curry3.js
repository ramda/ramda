var assert = require('assert');

var _ = require('../../src/__');
var _curry3 = require('../../src/internal/_curry3');


describe('_curry3', function() {
    it('supports R.__ placeholder', function() {
        var f = function(a, b, c) { return [a, b, c]; };
        var g = _curry3(f);

        assert.deepEqual(g(1)(2)(3), [1, 2, 3]);
        assert.deepEqual(g(1)(2, 3), [1, 2, 3]);
        assert.deepEqual(g(1, 2)(3), [1, 2, 3]);
        assert.deepEqual(g(1, 2, 3), [1, 2, 3]);

        assert.deepEqual(g(_, 2, 3)(1), [1, 2, 3]);
        assert.deepEqual(g(1, _, 3)(2), [1, 2, 3]);
        assert.deepEqual(g(1, 2, _)(3), [1, 2, 3]);

        assert.deepEqual(g(1, _, _)(2)(3), [1, 2, 3]);
        assert.deepEqual(g(_, 2, _)(1)(3), [1, 2, 3]);
        assert.deepEqual(g(_, _, 3)(1)(2), [1, 2, 3]);

        assert.deepEqual(g(1, _, _)(2, 3), [1, 2, 3]);
        assert.deepEqual(g(_, 2, _)(1, 3), [1, 2, 3]);
        assert.deepEqual(g(_, _, 3)(1, 2), [1, 2, 3]);

        assert.deepEqual(g(1, _, _)(_, 3)(2), [1, 2, 3]);
        assert.deepEqual(g(_, 2, _)(_, 3)(1), [1, 2, 3]);
        assert.deepEqual(g(_, _, 3)(_, 2)(1), [1, 2, 3]);

        assert.deepEqual(g(_, _, _)(_, _)(_)(1, 2, 3), [1, 2, 3]);
        assert.deepEqual(g(_, _, _)(1, _, _)(_, _)(2, _)(_)(3), [1, 2, 3]);
    });
});
