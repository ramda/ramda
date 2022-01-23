var R = require('../source/index.js');
var eq = require('./shared/eq.js');


describe('or', function() {
  it('compares two values with js ||', function() {
    eq(R.or(true, true), true);
    eq(R.or(true, false), true);
    eq(R.or(false, true), true);
    eq(R.or(false, false), false);
  });

});
