var R = require('../source');
var eq = require('./shared/eq');


describe('F', function() {
  it('always returns false', function() {
    eq(R.F(), false);
    eq(R.F(10), false);
    eq(R.F(true), false);
  });

});
