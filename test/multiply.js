var R = require('../source');
var eq = require('./shared/eq');


describe('multiply', function() {
  it('multiplies together two numbers', function() {
    eq(R.multiply(6, 7), 42);
  });

});
