var R = require('../source/index.js');
var eq = require('./shared/eq.js');
var _isArrayLike = require('../source/internal/_isArrayLike.js');


describe('until', function() {
  it('applies fn until pred is satisfied', function() {
    eq(R.until(R.gt(R.__, 100), R.multiply(2), 1), 128);
  });

  it('works with lists', function() {
    eq(R.until(R.none(_isArrayLike), R.unnest)([1, [2], [[3]]]), [1, 2, 3]);
  });

  it('ignores fn if predicate is always true', function() {
    eq(R.until(R.T, R.T, false), false);
  });

});
