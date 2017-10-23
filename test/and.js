var R = require('..');
var eq = require('./shared/eq');


describe('and', function() {
  it('compares two values with js &&', function() {
    eq(R.and(true, true), true);
    eq(R.and(true, false), false);
    eq(R.and(false, true), false);
    eq(R.and(false, false), false);
    eq(R.and(0, 2), 0);
    eq(R.and(0, false), 0);
    eq(R.and(1, 2), 2);
    eq(R.and(1, false), false);
  });

});
