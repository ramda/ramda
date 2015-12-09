var R = require('..');
var eq = require('./shared/eq');


describe('zip', function() {
  it('returns an array of "tuples"', function() {
    var a = [1, 2, 3], b = [100, 200, 300];
    eq(R.zip(a, b), [[1, 100], [2, 200], [3, 300]]);
  });

  it('returns a list as long as the shorter of the lists input', function() {
    var a = [1, 2, 3], b = [100, 200, 300, 400], c = [10, 20];
    eq(R.zip(a, b), [[1, 100], [2, 200], [3, 300]]);
    eq(R.zip(a, c), [[1, 10], [2, 20]]);
  });

  it('can zip a finite list with an infinite list', function() {
    const range = R.xrange(1, 1, Infinity);
    eq(R.zip(['a', 'b', 'c'], range), [['a', 1], ['b', 2], ['c', 3]]);
    eq(R.zip(range, ['a', 'b', 'c']), [[1, 'a'], [2, 'b'], [3, 'c']]);
  });

  it('can zip two infinite list', function() {
    const even = R.xrange(2, 2, Infinity);
    const natural = R.xrange(1, 1, Infinity);
    eq(R.take(3, R.zip(natural, even)), [[1, 2], [2, 4], [3, 6]]);
  });
});
