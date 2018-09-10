var R = require('../source');
var eq = require('./shared/eq');


describe('dropRepeatsWith', function() {
  var objs = [
    {i: 1}, {i: 2}, {i: 3}, {i: 4}, {i: 5}, {i: 3}
  ];
  var objs2 = [
    {i: 1}, {i: 1}, {i: 1}, {i: 2}, {i: 3},
    {i: 3}, {i: 4}, {i: 4}, {i: 5}, {i: 3}
  ];
  var eqI = R.eqProps('i');

  it('removes repeated elements based on predicate', function() {
    eq(R.dropRepeatsWith(eqI, objs2), objs);
    eq(R.dropRepeatsWith(eqI, objs), objs);
  });

  it('keeps elements from the left', function() {
    eq(
      R.dropRepeatsWith(eqI, [{i: 1, n: 1}, {i: 1, n: 2}, {i: 1, n: 3}, {i: 4, n: 1}, {i: 4, n: 2}]),
      [{i: 1, n: 1}, {i: 4, n: 1}]
    );
  });

  it('returns an empty array for an empty array', function() {
    eq(R.dropRepeatsWith(eqI, []), []);
  });

  it('can act as a transducer', function() {
    eq(R.into([], R.dropRepeatsWith(eqI), objs2), objs);
  });

});
