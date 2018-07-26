var R = require('../source');
var eq = require('./shared/eq');


describe('product', function() {
  it('multiplies together the array of numbers supplied', function() {
    eq(R.product([1, 2, 3, 4]), 24);
  });

});
