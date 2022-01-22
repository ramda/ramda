var R = require('../source/index.js');
var eq = require('./shared/eq.js');


describe('toLower', function() {
  it('returns the lower-case equivalent of the input string', function() {
    eq(R.toLower('XYZ'), 'xyz');
  });

});
