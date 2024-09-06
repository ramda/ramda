var R = require('../source/index.js');
var eq = require('./shared/eq.js');


describe('upperFirst', function() {
  it('returns the upper-first-case equivalent of the input string', function() {
    eq(R.upperFirst('javascript'), 'Javascript');
  });
  it('returns empty if the input is not string', function() {
    eq(R.upperFirst([1, 2, 3]), '');
  });

});
