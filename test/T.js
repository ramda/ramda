var R = require('../source');
var eq = require('./shared/eq');


describe('T', function() {
  it('always returns true', function() {
    eq(R.T(), true);
    eq(R.T(10), true);
    eq(R.T(true), true);
  });

});
