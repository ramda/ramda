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

});
