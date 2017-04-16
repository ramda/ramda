var R = require('..');
var eq = require('./shared/eq');


describe('multiply', function() {
  it('multiplies together two numbers', function() {
    eq(R.multiply(6, 7), 42);
  });

  it('is curried', function() {
    var dbl = R.multiply(2);
    eq(dbl(15), 30);
  });

});
