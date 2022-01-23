var R = require('../source/index.js');
var eq = require('./shared/eq.js');


describe('toUpper', function() {
  it('returns the upper-case equivalent of the input string', function() {
    eq(R.toUpper('abc'), 'ABC');
  });

});
