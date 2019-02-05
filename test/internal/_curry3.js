var eq = require('../shared/eq');
var _ = require('../../source/__');
var _curry3 = require('../../source/internal/_curry3');


describe('_curry3', function() {
  it('supports R.__ placeholder', function() {
    var f = function(a, b, c) { return [a, b, c]; };
    var g = _curry3(f);

    eq(g(1)(2)(3), [1, 2, 3]);
    eq(g(1)(2, 3), [1, 2, 3]);
    eq(g(1, 2)(3), [1, 2, 3]);
    eq(g(1, 2, 3), [1, 2, 3]);

    eq(g(_, 2, 3)(1), [1, 2, 3]);
    eq(g(1, _, 3)(2), [1, 2, 3]);
    eq(g(1, 2, _)(3), [1, 2, 3]);

    eq(g(1, _, _)(2)(3), [1, 2, 3]);
    eq(g(_, 2, _)(1)(3), [1, 2, 3]);
    eq(g(_, _, 3)(1)(2), [1, 2, 3]);

    eq(g(1, _, _)(2, 3), [1, 2, 3]);
    eq(g(_, 2, _)(1, 3), [1, 2, 3]);
    eq(g(_, _, 3)(1, 2), [1, 2, 3]);

    eq(g(1, _, _)(_, 3)(2), [1, 2, 3]);
    eq(g(_, 2, _)(_, 3)(1), [1, 2, 3]);
    eq(g(_, _, 3)(_, 2)(1), [1, 2, 3]);

    eq(g(_, _, _)(_, _)(_)(1, 2, 3), [1, 2, 3]);
    eq(g(_, _, _)(1, _, _)(_, _)(2, _)(_)(3), [1, 2, 3]);
  });

  it('retains the original function name', function() {
    function fn(a, b) { return [a, b]; }
    var g = _curry3(fn);

    eq(g.name, fn.name);

    eq(g(1)(2).name, fn.name);
    eq(g(1, 2).name, fn.name);

    eq(g(_, 2, 3).name, fn.name);
    eq(g(1, _, 3).name, fn.name);
    eq(g(1, 2, _).name, fn.name);

    eq(g(1, _, _)(2).name, fn.name);
    eq(g(_, 2, _)(1).name, fn.name);
    eq(g(_, _, 3)(1).name, fn.name);

    eq(g(1, _, _)(_, 3).name, fn.name);
    eq(g(_, 2, _)(_, 3).name, fn.name);
    eq(g(_, _, 3)(_, 2).name, fn.name);

    eq(g(_, _, _)(_, _)(_)(1, 2), fn.name);
    eq(g(_, _, _)(1, _, _)(_, _)(2, _)(_), fn.name);
  });
});
