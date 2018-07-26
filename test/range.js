var assert = require('assert');

var R = require('../source');
var eq = require('./shared/eq');


describe('range', function() {

  it('returns list of numbers', function() {
    eq(R.range(0, 5), [0, 1, 2, 3, 4]);
    eq(R.range(4, 7), [4, 5, 6]);
  });

  it('returns the empty list if the first parameter is not larger than the second', function() {
    eq(R.range(7, 3), []);
    eq(R.range(5, 5), []);
  });

  it('returns an empty array if from > to', function() {
    var result = R.range(10, 5);
    eq(result, []);
    result.push(5);
    eq(R.range(10, 5), []);
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
