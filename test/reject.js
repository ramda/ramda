var R = require('..');
var eq = require('./shared/eq');


describe('reject', function() {
  var even = function(x) {return x % 2 === 0;};

  it('reduces an array to those not matching a filter', function() {
    eq(R.reject(even, [1, 2, 3, 4, 5]), [1, 3, 5]);
  });

  it('returns an empty array if no element matches', function() {
    eq(R.reject(function(x) { return x < 100; }, [1, 9, 99]), []);
  });

  it('returns an empty array if asked to filter an empty array', function() {
    eq(R.reject(function(x) { return x > 100; }, []), []);
  });

  it('returns an empty array if no element matches', function() {
    eq(R.reject(function(x) { return x < 100; }, [1, 9, 99]), []);
  });

  it('returns an empty array if asked to filter an empty array', function() {
    eq(R.reject(function(x) { return x > 100; }, []), []);
  });

});
