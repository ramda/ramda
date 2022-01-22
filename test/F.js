var R = require('../source/index.js');
var eq = require('./shared/eq.js');


describe('F', function() {
  it('always returns false', function() {
    eq(R.F(), false);
    eq(R.F(10), false);
    eq(R.F(true), false);
  });

});
