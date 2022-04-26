var R = require('../source/index.js');
var eq = require('./shared/eq.js');
var Maybe = require('./shared/Maybe.js');


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

  it('filters objects', function() {
    eq(R.reject(R.equals(0), {}), {});
    eq(R.reject(R.equals(0), {x: 0, y: 0, z: 0}), {});
    eq(R.reject(R.equals(0), {x: 1, y: 0, z: 0}), {x: 1});
    eq(R.reject(R.equals(0), {x: 1, y: 2, z: 0}), {x: 1, y: 2});
    eq(R.reject(R.equals(0), {x: 1, y: 2, z: 3}), {x: 1, y: 2, z: 3});
  });

  it('dispatches to `filter` method', function() {
    var m = new Maybe.Just(42);
    eq(R.filter(R.T, m), m);
    eq(R.filter(R.F, m), Maybe.Nothing);
    eq(R.reject(R.T, m), Maybe.Nothing);
    eq(R.reject(R.F, m), m);
  });

  it('can act as a transducer', function() {
    var input = [1, 2, 3, 4];
    var expected = [1, 3];
    eq(R.into([], R.reject(even), input), expected);
    eq(R.transduce(R.reject(even), R.flip(R.append), [], input), expected);
  });

});
