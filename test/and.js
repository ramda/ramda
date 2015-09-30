var R = require('..');
var eq = require('./shared/eq');


describe('and', function() {
  it('compares two values with js &&', function() {
    eq(R.and(true, true), true);
    eq(R.and(true, false), false);
    eq(R.and(false, true), false);
    eq(R.and(false, false), false);
  });

  it('is curried', function() {
    var halfTruth = R.and(true);
    eq(halfTruth(false), false);
    eq(halfTruth(true), true);
  });
});
