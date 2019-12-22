var R = require('../source');
var eq = require('./shared/eq');

describe('partial', function() {
  var disc = function(a, b, c) {
    // note disc(3, 7, 4) => 1
    return b * b - 4 * a * c;
  };

  it('caches the initially supplied arguments', function() {
    var f = R.partial(disc, [3]);
    eq(f(7, 4), 1);
    var g = R.partial(disc, [3, 7]);
    eq(g(4), 1);
  });

  it('correctly reports the arity of the new function', function() {
    var f = R.partial(disc, [3]);
    eq(f.length, 2);
    var g = R.partial(disc, [3, 7]);
    eq(g.length, 1);
  });

  it('correctly processes rest arguments', function() {
    var foo = (a, b, c, d, ...rest) => ({ a, b, c, d, rest });
    var f = R.partial(foo, [100, 200]);
    eq(f(1, 2, 3, 4), { a: 100, b: 200, c: 1, d: 2, rest: [3, 4] });
  });
});
