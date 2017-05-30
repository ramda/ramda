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
    eq(f({ x: 1, y: 2 }), '{"x": 1, "y": 2}');
    eq(f({ x: 1, y: 2 }), '{"x": 1, "y": 2}');
    eq(f({ y: 2, x: 1 }), '{"x": 1, "y": 2}');
    eq(count, 1);
  });

  it('accepts 2 number arguments', function() {
    const add = R.memoize(function(a, b) { return a + b; });

    eq(add(1, 2), 3);
    eq(add(1, 3), 4);
  });

  it('accepts 2 string arguments', function() {
    var f = R.memoize(function(concatWith, a, b) {
      return a + concatWith + b;
    });

    const a_bc = f('_', 'a', 'bc');
    const ab_c = f('_', 'ab', 'c');

    eq(a_bc, 'a_bc');
    eq(ab_c, 'ab_c');
  });
});
