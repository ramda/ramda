var R = require('..');
var eq = require('./shared/eq');


describe('memoize', function() {
  it('memoizes "false" return values', function() {
    var count = 0;
    var inc = R.memoize(function(n) {
      count += 1;
      return n + 1;
    });
    eq(inc(-1), 0);
    eq(inc(-1), 0);
    eq(inc(-1), 0);
    eq(count, 1);
  });

  it('differentiates values with same string representation', function() {
    var f = R.memoize(R.toString);
    eq(f(42), '42');
    eq(f('42'), '"42"');
    eq(f([[42]]), '[[42]]');
    eq(f([['42']]), '[["42"]]');
  });

  it('respects object equivalence', function() {
    var count = 0;
    var f = R.memoize(function(x) {
      count += 1;
      return R.toString(x);
    });
    eq(f({x: 1, y: 2}), '{"x": 1, "y": 2}');
    eq(f({x: 1, y: 2}), '{"x": 1, "y": 2}');
    eq(f({y: 2, x: 1}), '{"x": 1, "y": 2}');
    eq(count, 1);
  });

  it('works with 2 arguments', function() {
    var called = 0;

    var add = R.memoize(function(x, y) {
      called += 1;
      return x + y;
    });

    eq(add(1, 2), 3);
    eq(called, 1);

    eq(add(1, 2), 3);
    eq(called, 1);

    eq(add(1, 3), 4);
    eq(called, 2);
  });
});
