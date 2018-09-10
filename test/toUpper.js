var R = require('../source');
var eq = require('./shared/eq');


describe('toUpper', function() {
  it('returns the upper-case equivalent of the input string', function() {
    eq(R.toUpper('abc'), 'ABC');
  });

});
