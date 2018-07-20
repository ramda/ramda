var R = require('../source');
var eq = require('./shared/eq');


describe('median', function() {

  it('returns middle value of an odd-length list', function() {
    eq(R.median([2]), 2);
    eq(R.median([2, 9, 7]), 7);
  });

  it('returns mean of two middle values of a nonempty even-length list', function() {
    eq(R.median([7, 2]), 4.5);
    eq(R.median([7, 2, 10, 9]), 8);
  });

  it('returns NaN for an empty list', function() {
    eq(R.identical(NaN, R.median([])), true);
  });

  it('handles array-like object', function() {
    eq(R.median((function() { return arguments; })(1, 2, 3)), 2);
  });

});
