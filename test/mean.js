var R = require('..');
var eq = require('./shared/eq');


describe('mean', function() {

  it('returns mean of a nonempty list', function() {
    eq(R.mean([2]), 2);
    eq(R.mean([2, 7]), 4.5);
    eq(R.mean([2, 7, 9]), 6);
    eq(R.mean([2, 7, 9, 10]), 7);
  });

  it('returns NaN for an empty list', function() {
    eq(R.identical(NaN, R.mean([])), true);
  });

});
