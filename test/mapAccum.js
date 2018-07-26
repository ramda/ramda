var R = require('../source');
var eq = require('./shared/eq');


describe('mapAccum', function() {
  var add = function(a, b) {return [a + b, a + b];};
  var mult = function(a, b) {return [a * b, a * b];};
  var concat = function(a, b) {return [a.concat(b), a.concat(b)];};

  it('map and accumulate simple functions over arrays with the supplied accumulator', function() {
    eq(R.mapAccum(add, 0, [1, 2, 3, 4]), [10, [1, 3, 6, 10]]);
    eq(R.mapAccum(mult, 1, [1, 2, 3, 4]), [24, [1, 2, 6, 24]]);
  });

  it('returns the list and accumulator for an empty array', function() {
    eq(R.mapAccum(add, 0, []), [0, []]);
    eq(R.mapAccum(mult, 1, []), [1, []]);
    eq(R.mapAccum(concat, [], []), [[], []]);
  });

});
