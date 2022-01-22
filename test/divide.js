var R = require('../source/index.js');
var eq = require('./shared/eq.js');


describe('divide', function() {
  it('divides two numbers', function() {
    eq(R.divide(28, 7), 4);
  });

});
