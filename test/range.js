var assert = require('assert');

var R = require('..');
var eq = require('./shared/eq');


describe('range', function() {

  it('returns list of numbers', function() {
    eq(R.range(0, 5), [0, 1, 2, 3, 4]);
    eq(R.range(4, 7), [4, 5, 6]);
  });

  it('returns numbers in descending order if from is greater than to', function() {
    eq(R.range(5, 1), [5, 4, 3, 2]);
  });

  it('returns the empty list if both parameters are equal', function() {
    eq(R.range(5, 5), []);
  });

  it('is curried', function() {
    var from10 = R.range(10);
    eq(from10(15), [10, 11, 12, 13, 14]);
  });

  it('terminates given bad input', function() {
    assert.throws(
      function() { R.range('a', 'z'); },
      function(err) {
        return err.constructor === TypeError &&
               err.message === 'Both arguments to range must be numbers';
      }
    );
  });

});
