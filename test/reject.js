var S = require('sanctuary');

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

  it('filters objects', function() {
    eq(R.reject(R.equals(0), {}), {});
    eq(R.reject(R.equals(0), {x: 0, y: 0, z: 0}), {});
    eq(R.reject(R.equals(0), {x: 1, y: 0, z: 0}), {x: 1});
    eq(R.reject(R.equals(0), {x: 1, y: 2, z: 0}), {x: 1, y: 2});
    eq(R.reject(R.equals(0), {x: 1, y: 2, z: 3}), {x: 1, y: 2, z: 3});
  });

  it('supports Fantasy Land types', function() {
    eq(R.filter(R.T, S.Just(42)), S.Just(42));
    eq(R.filter(R.F, S.Just(42)), S.Nothing);
    eq(R.reject(R.T, S.Just(42)), S.Nothing);
    eq(R.reject(R.F, S.Just(42)), S.Just(42));
  });

});
