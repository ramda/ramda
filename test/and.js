var R = require('../source');
var eq = require('./shared/eq');


describe('and', function() {
  it('compares two values with js &&', function() {
    eq(R.and(true, true), true);
    eq(R.and(true, false), false);
    eq(R.and(false, true), false);
    eq(R.and(false, false), false);
  });

});
