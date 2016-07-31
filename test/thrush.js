var R = require('..');
var thrush = require('../src/thrush.js');
var eq = require('./shared/eq');

describe('thrush', function() {
  it('apply the function to his first argument', function() {
    eq(thrush(21, R.multiply(2)), 42);
  });

  it('has length 2', function() {
    eq(R.thrush.length, 2);
  });

  it('is correctly curried', function() {
    eq(thrush(42, R.identity), 42);
    eq(thrush(42)(R.identity), 42);
    eq(thrush(R.__, R.identity)(42), 42);
  });
});
