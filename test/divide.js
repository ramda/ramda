var R = require('..');
var eq = require('./shared/eq');


describe('divide', function() {
  it('divides two numbers', function() {
    eq(R.divide(28, 7), 4);
  });

  it('is curried', function() {
    var into28 = R.divide(28);
    eq(into28(7), 4);
  });

  it('behaves right curried when passed `R.__` for its first argument', function() {
    var half = R.divide(R.__, 2);
    eq(half(40), 20);
  });
});
