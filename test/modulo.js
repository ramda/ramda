var R = require('../source');
var eq = require('./shared/eq');


describe('modulo', function() {
  it('divides the first param by the second and returns the remainder', function() {
    eq(R.modulo(100, 2), 0);
    eq(R.modulo(100, 3), 1);
    eq(R.modulo(100, 17), 15);
  });

  it('preserves javascript-style modulo evaluation for negative numbers', function() {
    eq(R.modulo(-5, 4), -1);
  });

});
