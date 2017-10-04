var R = require('..');
var eq = require('./shared/eq');

describe('applyTo', function() {
  it('applies the function to its first argument', function() {
    eq(R.applyTo(21, R.multiply(2)), 42);
  });

  it('has length 2', function() {
    eq(R.applyTo.length, 2);
  });

  it('is curried', function() {
    eq(R.applyTo(42, R.identity), 42);
    eq(R.applyTo(42)(R.identity), 42);
    eq(R.applyTo(R.__, R.identity)(42), 42);
  });
});

