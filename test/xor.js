var R = require('../source');
var eq = require('./shared/eq');


describe('xor', function() {
  it('compares two values with exclusive or', function() {
    eq(R.xor(true, true), false);
    eq(R.xor(true, false), true);
    eq(R.xor(false, true), true);
    eq(R.xor(false, false), false);
  });

});
