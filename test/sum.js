var R = require('../source');
var eq = require('./shared/eq');


describe('sum', function() {
  it('adds together the array of numbers supplied', function() {
    eq(R.sum([1, 2, 3, 4]), 10);
  });

  it('does not save the state of the accumulator', function() {
    eq(R.sum([1, 2, 3, 4]), 10);
    eq(R.sum([1]), 1);
    eq(R.sum([5, 5, 5, 5, 5]), 25);
  });

});
