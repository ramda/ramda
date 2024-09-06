var R = require('../source/index.js');
var eq = require('./shared/eq.js');


describe('lowerFirst', function() {
  it('returns the lower-first-case equivalent of the input string', function() {
    eq(R.lowerFirst('Javascript'), 'javascript');
  });
  it('returns empty if the input is not string', function() {
    eq(R.lowerFirst([1, 2, 3]), '');
  });

});
