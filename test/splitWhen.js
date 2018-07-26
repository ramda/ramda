var R = require('../source');
var eq = require('./shared/eq');


describe('splitWhen', function() {
  it('splits an array at the first instance to satisfy the predicate', function() {
    eq(R.splitWhen(R.equals(2), [1, 2, 3]), [[1], [2, 3]]);
  });

  it('retains all original elements', function() {
    eq(R.splitWhen(R.T, [1, 1, 1]), [[], [1, 1, 1]]);
  });

  it('only splits once', function() {
    eq(R.splitWhen(R.equals(2), [1, 2, 3, 1, 2, 3]), [[1], [2, 3, 1, 2, 3]]);
  });
});
