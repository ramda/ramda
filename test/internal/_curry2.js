var eq = require('../shared/eq');
var _ = require('../../source/__');
var _curry2 = require('../../source/internal/_curry2');


describe('_curry2', function() {
  it('supports R.__ placeholder', function() {
    var f = function(a, b) { return [a, b]; };
    var g = _curry2(f);

    eq(g(1)(2), [1, 2]);
    eq(g(1, 2), [1, 2]);

    eq(g(_, 2)(1), [1, 2]);
    eq(g(1, _)(2), [1, 2]);

    eq(g(_, _)(1)(2), [1, 2]);
    eq(g(_, _)(1, 2), [1, 2]);
    eq(g(_, _)(_)(1, 2), [1, 2]);
    eq(g(_, _)(_, 2)(1), [1, 2]);
  });
});
