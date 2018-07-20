var R = require('../source');
var eq = require('./shared/eq');


describe('uniqWith', function() {
  var objs = [
    {x: R.T, i: 0}, {x: R.F, i: 1}, {x: R.T, i: 2}, {x: R.T, i: 3},
    {x: R.F, i: 4}, {x: R.F, i: 5}, {x: R.T, i: 6}, {x: R.F, i: 7}
  ];
  var objs2 = [
    {x: R.T, i: 0}, {x: R.F, i: 1}, {x: R.T, i: 2}, {x: R.T, i: 3},
    {x: R.F, i: 0}, {x: R.T, i: 1}, {x: R.F, i: 2}, {x: R.F, i: 3}
  ];
  function eqI(x, accX) { return x.i === accX.i; }

  it('returns a set from any array (i.e. purges duplicate elements) based on predicate', function() {
    eq(R.uniqWith(eqI, objs), objs);
    eq(R.uniqWith(eqI, objs2), [{x: R.T, i: 0}, {x: R.F, i: 1}, {x: R.T, i: 2}, {x: R.T, i: 3}]);
  });

  it('keeps elements from the left', function() {
    eq(R.uniqWith(eqI, [{i: 1}, {i: 2}, {i: 3}, {i: 4}, {i: 1}]), [{i: 1}, {i: 2}, {i: 3}, {i: 4}]);
  });

  it('returns an empty array for an empty array', function() {
    eq(R.uniqWith(eqI, []), []);
  });

});
