var R = require('../source');
var eq = require('./shared/eq');


describe('splitWith', function() {
  it('splits an array at every instance of predicate matching', function() {
    eq(R.splitWith(R.equals(2), [1, 2, 3, 4, 2, 1]), [[1], [3, 4], [1]]);
    eq(R.splitWith(R.equals('a'), ['b','a','n','a','n','a','s']), [['b'],['n'],['n'],['s']]);
    eq(R.splitWith(R.gt(5), [1, 7, 5, 4, 3, 7, 6]), [[7, 5], [7, 6]]);
    eq(R.splitWith(R.propEq('x', 5), [{x:1}, {x:5}, {x:7}]), [[{x:1}], [{x:7}]]);
  });
  it('retains all original elements when the predicate matches nothing', function() {
    eq(R.splitWith(R.equals(2), [1, 1, 1]), [[1, 1, 1]]);
  });
  it('returns sane default if an empty list is given', function() {
    eq(R.splitWith(R.equals(1), []), []);
  });
  it('handles first and last elements matching predicate', function() {
    eq(R.splitWith(R.equals(1), [1, 2, 3, 4, 1]), [[2, 3, 4]]);
    eq(R.splitWith(R.equals(1), [1, 1, 1, 1, 1]), []);
    eq(R.splitWith(R.equals(1), [1, 1, 2, 3, 4, 1, 1]), [[2, 3, 4]]);
  });
});
