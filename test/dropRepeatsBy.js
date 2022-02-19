var R = require('../source/index.js');
var eq = require('./shared/eq.js');


describe('dropRepeatsBy', function() {
  var objs = [
    {i: 1}, {i: 2}, {i: 3}, {i: -4}, {i: 5}, {i: 3}
  ];
  var objs2 = [
    {i: 1}, {i: -1}, {i: 1}, {i: 2}, {i: 3},
    {i: 3}, {i: -4}, {i: 4}, {i: 5}, {i: 3}
  ];
  var pred = R.compose(R.evolve({ i: Math.abs }), R.dissoc('n'));

  it('removes repeated elements based on predicate', function() {
    eq(R.dropRepeatsBy(pred, objs2), objs);
    eq(R.dropRepeatsBy(pred, objs), objs);
  });

  it('keeps elements from the left', function() {
    eq(
      R.dropRepeatsBy(pred, [{i: 1, n: 1}, {i: 1, n: 2}, {i: 1, n: 3}, {i: 4, n: 1}, {i: 4, n: 2}]),
      [{i: 1, n: 1}, {i: 4, n: 1}]
    );
  });

  it('returns an empty array for an empty array', function() {
    eq(R.dropRepeatsBy(pred, []), []);
  });

  it('can act as a transducer', function() {
    eq(R.into([], R.dropRepeatsBy(pred), objs2), objs);
  });

});
