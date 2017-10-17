var R = require('..');
var eq = require('./shared/eq');


describe('until', function() {
  it('applies fn until pred is satisfied', function() {
    eq(R.until(R.gt(R.__, 100), R.multiply(2), 1), 128);
  });

  it('ignores fn if predicate is always true', function() {
    eq(R.until(R.T, R.T, false), false);
  });

});
