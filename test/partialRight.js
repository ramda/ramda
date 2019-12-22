var R = require('../source');
var eq = require('./shared/eq');

describe('partialRight', function() {
  var disc = function(a, b, c) {
    // note disc(3, 7, 4) => 1
    return b * b - 4 * a * c;
  };

  it('caches the initially supplied arguments', function() {
    var f = R.partialRight(disc, [4]);
    eq(f(3, 7), 1);
    var g = R.partialRight(disc, [7, 4]);
    eq(g(3), 1);
  });

  it('correctly reports the arity of the new function', function() {
    var f = R.partialRight(disc, [4]);
    eq(f.length, 2);
    var g = R.partialRight(disc, [7, 4]);
    eq(g.length, 1);
  });

  it('correctly processes rest arguments', function() {
    var foo = (a, b, c, d, ...rest) => ({ a, b, c, d, rest });
    var f = R.partialRight(foo, [100, 200]);
    eq(f(1, 2, 3, 4), { a: 1, b: 2, c: 100, d: 200, rest: [3, 4] });
  });
});
