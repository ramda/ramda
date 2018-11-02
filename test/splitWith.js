var R = require('../source');
var eq = require('./shared/eq');


describe.only('splitWith', function() {
  it('splits an array at every instance of predicate matching', function() {
    eq(R.splitWith(R.equals(2), [1, 2, 3, 4, 2, 1]), [[1], [3, 4], [1]]);
  });
  it('retains all original elements', function() {
    eq(R.splitWith(R.equals(2), [1, 1, 1]), [[1, 1, 1]]);
  });
  it('returns sane default if an empty list is given', function() {
    eq(R.splitWith(R.equals(1), []), []);
  });
  it('handles first and last elements matching predicate', function() {
    eq(R.splitWith(R.equals(1), [1, 2, 3, 4, 1]), [[2, 3, 4]]);
  });
  it('handles strings', function() {
    eq(R.splitWith(R.equals('a'), 'bananas'), [['b'],['n'],['n'],['s']]);
  });
});
