var R = require('..');
var eq = require('./shared/eq');


describe('lte', function() {
  it('reports whether one item is less than another', function() {
    eq(R.lte(3, 5), true);
    eq(R.lte(6, 4), false);
    eq(R.lte(7.0, 7.0), true);
    eq(R.lte('abc', 'xyz'), true);
    eq(R.lte('abcd', 'abc'), false);
  });

  it('is curried', function() {
    var gte20 = R.lte(20);
    eq(gte20(10), false);
    eq(gte20(20), true);
    eq(gte20(25), true);
  });

  it('behaves right curried when passed `R.__` for its first argument', function() {
    var upTo20 = R.lte(R.__, 20);
    eq(upTo20(10), true);
    eq(upTo20(20), true);
    eq(upTo20(25), false);
  });
});
