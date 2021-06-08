var R = require('../source');
var eq = require('./shared/eq');

describe('count', function() {
  var even = function(x) { return x % 2 === 0; };
  it('counts items in a list that match a filter', function() {
    eq(R.count(even, [1, 2, 3, 4, 5]), 2);
    eq(R.count(even, [2, 8, 10, 200]), 4);
  });

  it('returns zero when no element matches', function() {
    eq(R.count(even, [1, 3, 5, 7]), 0);
  });

  it('returns zero for an empty list', function() {
    eq(R.count(even, []), 0);
  });
});
