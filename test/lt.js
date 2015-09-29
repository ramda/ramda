var R = require('..');
var eq = require('./shared/eq');


describe('lt', function() {
  it('reports whether one item is less than another', function() {
    eq(R.lt(3, 5), true);
    eq(R.lt(6, 4), false);
    eq(R.lt(7.0, 7.0), false);
    eq(R.lt('abc', 'xyz'), true);
    eq(R.lt('abcd', 'abc'), false);
  });

  it('is curried', function() {
    var gt5 = R.lt(5);
    eq(gt5(10), true);
    eq(gt5(5), false);
    eq(gt5(3), false);
  });

  it('behaves right curried when passed `R.__` for its first argument', function() {
    var lt5 = R.lt(R.__, 5);
    eq(lt5(10), false);
    eq(lt5(5), false);
    eq(lt5(3), true);
  });
});
