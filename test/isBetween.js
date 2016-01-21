var R = require('..');
var eq = require('./shared/eq');


describe('isBetween', function() {
  it('reports if a number is between min and max values', function() {
    eq(R.isBetween(1, 3, 4), false);
    eq(R.isBetween(1, 3, 2), true);
  });
});
