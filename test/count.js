var R = require('../source');
var eq = require('./shared/eq');

describe('count', function() {
  var even = function(x) { return x % 2 === 0; };
  it('counts items in a list that match a filter', function() {
    eq(R.count(even, [1, 2, 3, 4, 5]), 2);
    eq(R.count(even, [1, 2, 3, 6]), 2);
    eq(R.count(even, [1, 2, 3]), 1);
  });

  it('returns zero when no element matches', function() {
    eq(R.count(even, [1, 3, 5, 7]), 0);
  });

  it('returns zero for an empty list', function() {
    eq(R.count(even, []), 0);
  });

  it('is curried', function() {
    eq(R.map(R.count(even), [[1, 1, 1], [2, 3, 4, 5], [6]]), [0, 2, 1]);

    eq(R.count(even)([1, 2, 3]), 1);
    eq(R.count(R.__, [1, 2, 3])(even), 1);
  });
});
