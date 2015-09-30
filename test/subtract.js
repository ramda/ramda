var R = require('..');
var eq = require('./shared/eq');


describe('subtract', function() {
  it('subtracts two numbers', function() {
    eq(R.subtract(22, 7), 15);
  });

  it('is curried', function() {
    var ninesCompl = R.subtract(9);
    eq(ninesCompl(6), 3);
  });

  it('behaves right curried when passed `R.__` for its first argument', function() {
    var minus5 = R.subtract(R.__, 5);
    eq(minus5(17), 12);
  });
});
