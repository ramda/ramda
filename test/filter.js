var R = require('..');
var eq = require('./shared/eq');


describe('filter', function() {
  var even = function(x) {return x % 2 === 0;};

  it('reduces an array to those matching a filter', function() {
    eq(R.filter(even, [1, 2, 3, 4, 5]), [2, 4]);
  });

  it('returns an empty array if no element matches', function() {
    eq(R.filter(function(x) { return x > 100; }, [1, 9, 99]), []);
  });

  it('returns an empty array if asked to filter an empty array', function() {
    eq(R.filter(function(x) { return x > 100; }, []), []);
  });

  it('dispatches to passed-in non-Array object with a `filter` method', function() {
    var f = {filter: function(f) { return f('called f.filter'); }};
    eq(R.filter(function(s) { return s; }, f), 'called f.filter');
  });

  it('is curried', function() {
    var onlyEven = R.filter(even);
    eq(onlyEven([1, 2, 3, 4, 5, 6, 7]), [2, 4, 6]);
  });

  it('can filter on infinite list', function() {
    const natural = R.xrange(1, 1, Infinity);
    eq(R.take(3, R.filter(even, natural)), [2, 4, 6]);
  });
});
