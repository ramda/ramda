var R = require('../source/index.js');
var eq = require('./shared/eq.js');


describe('multiply', function() {
  it('multiplies together two numbers', function() {
    eq(R.multiply(6, 7), 42);
  });

});
