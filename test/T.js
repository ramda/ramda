var R = require('../source/index.js');
var eq = require('./shared/eq.js');


describe('T', function() {
  it('always returns true', function() {
    eq(R.T(), true);
    eq(R.T(10), true);
    eq(R.T(true), true);
  });

});
