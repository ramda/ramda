var R = require('../source');
var eq = require('./shared/eq');


describe('splitWith', function() {
  it('splits an array at every instance of predicate matching', function() {
    eq(R.splitWith(R.equals(2), [1, 2, 3]), [[1, 2], [3]]);
  });
  it('retains all original elements', function() {
    eq(R.splitWith(R.equals(2), [1, 1, 1]), [[1, 1, 1]]);
    eq(R.splitWith(R.equals(2), [1, 2, 1, 2, 1]), [[1, 2], [1, 2], [1]]);
  });
  it('returns sane default if an empty list is given', function() {
    eq(R.splitWith(R.equals(1), []), []);
  });
  it('only returns as many groups as there are matches', function() {
    eq(R.splitWith(R.equals(2), [1, 2, 3, 4, 2]), [[1, 2],[3, 4, 2]]);
  });
});
