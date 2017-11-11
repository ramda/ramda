var R = require('..');
var eq = require('./shared/eq');

describe('thrush', function() {
  it('apply the function to his first argument', function() {
    eq(R.thrush(21, R.multiply(2)), 42);
  });

  it('can be chained', function() {
    var chainedThrush = R.thrush(R.always)(R.thrush(42));
    eq(chainedThrush(R.identity), 42)
  });

  it('has length 2', function() {
    eq(R.thrush.length, 2);
  });

  it('is curried', function() {
    eq(R.thrush(42, R.identity), 42);
    eq(R.thrush(42)(R.identity), 42);
    eq(R.thrush(R.__, R.identity)(42), 42);
  });
});
