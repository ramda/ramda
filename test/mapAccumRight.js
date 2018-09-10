var R = require('../source');
var eq = require('./shared/eq');


describe('mapAccumRight', function() {
  var add = function(a, b) {return [a + b, a + b];};
  var mult = function(a, b) {return [a * b, a * b];};

  it('map and accumulate simple functions over arrays with the supplied accumulator', function() {
    eq(R.mapAccumRight(add, 0, [1, 2, 3, 4]), [10, [10, 9, 7, 4]]);
    eq(R.mapAccumRight(mult, 1, [1, 2, 3, 4]), [24, [24, 24, 12, 4]]);
  });

  it('returns the list and accumulator for an empty array', function() {
    eq(R.mapAccumRight(add, 0, []), [0, []]);
    eq(R.mapAccumRight(mult, 1, []), [1, []]);
    eq(R.mapAccumRight(R.concat, [], []), [[], []]);
  });

});
