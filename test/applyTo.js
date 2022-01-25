var R = require('../source/index.js');
var eq = require('./shared/eq.js');

describe('applyTo', function() {
  it('applies the function to its first argument', function() {
    eq(R.applyTo(21, R.multiply(2)), 42);
  });

  it('has length 2', function() {
    eq(R.applyTo.length, 2);
  });

});
