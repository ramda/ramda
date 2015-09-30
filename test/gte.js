var R = require('..');
var eq = require('./shared/eq');


describe('gte', function() {
  it('reports whether one item is less than another', function() {
    eq(R.gte(3, 5), false);
    eq(R.gte(6, 4), true);
    eq(R.gte(7.0, 7.0), true);
    eq(R.gte('abc', 'xyz'), false);
    eq(R.gte('abcd', 'abc'), true);
  });

  it('is curried', function() {
    var lte20 = R.gte(20);
    eq(lte20(10), true);
    eq(lte20(20), true);
    eq(lte20(25), false);
  });

  it('behaves right curried when passed `R.__` for its first argument', function() {
    var gte20 = R.gte(R.__, 20);
    eq(gte20(10), false);
    eq(gte20(20), true);
    eq(gte20(25), true);
  });
});
