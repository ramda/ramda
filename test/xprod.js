var R = require('..');
var eq = require('./shared/eq');


describe('xprod', function() {
  var a = [1, 2], b = ['a', 'b', 'c'];

  it('returns an empty list if either input list is empty', function() {
    eq(R.xprod([], [1, 2, 3]), []);
    eq(R.xprod([1, 2, 3], []), []);
  });

  it('creates the collection of all cross-product pairs of its parameters', function() {
    eq(R.xprod(a, b), [[1, 'a'], [1, 'b'], [1, 'c'], [2, 'a'], [2, 'b'], [2, 'c']]);
  });

  it('is curried', function() {
    var something = R.xprod(b);
    eq(something(a), [['a', 1], ['a', 2], ['b', 1], ['b', 2], ['c', 1], ['c', 2]]);
  });

  it('correctly reports the arity of curried versions', function() {
    var something = R.xprod(a);
    eq(something.length, 1);
  });
});
