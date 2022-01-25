var R = require('../source/index.js');
var eq = require('./shared/eq.js');


describe('product', function() {
  it('multiplies together the array of numbers supplied', function() {
    eq(R.product([1, 2, 3, 4]), 24);
  });

});
