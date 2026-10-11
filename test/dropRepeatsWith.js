var R = require('../source/index.js');
var eq = require('./shared/eq.js');


describe('dropRepeatsWith', function() {
  var objs = [
    {i: 1}, {i: 2}, {i: 3}, {i: 4}, {i: 5}, {i: 3}
  ];
  var objs2 = [
    {i: 1}, {i: 1}, {i: 1}, {i: 2}, {i: 3},
    {i: 3}, {i: 4}, {i: 4}, {i: 5}, {i: 3}
  ];
  var eqI = (a, b) => a.i === b.i;

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
    eq(R.transduce(R.dropRepeatsWith(eqI), R.flip(R.append), [], objs2), objs);
  });

  it('compares with the last retained value when acting as a transducer', function() {
    var close = function(a, b) { return Math.abs(a - b) <= 1; };
    var values = [1, 2, 3, 4, 5];
    var expected = [1, 3, 5];
    eq(R.dropRepeatsWith(close, values), expected);
    eq(R.into([], R.dropRepeatsWith(close), values), expected);
    eq(R.transduce(R.dropRepeatsWith(close), R.flip(R.append), [], values), expected);
    eq(values, [1, 2, 3, 4, 5]);
  });

  it('tracks retained values independently of the accumulator', function() {
    var close = function(a, b) { return Math.abs(a.i - b.i) <= 1; };
    var values = [{i: 1}, {i: 2}, {i: 3}, {i: 4}, {i: 5}];
    var transducer = R.dropRepeatsWith(close);
    var sum = function(total, value) { return total + value.i; };
    eq(R.transduce(transducer, sum, 0, values), 9);
    eq(R.transduce(transducer, sum, 10, values), 19);
  });

  it('stops when a downstream transducer has enough retained values', function() {
    var visited = [];
    var transducer = R.compose(
      R.map(function(value) { visited.push(value); return value; }),
      R.dropRepeatsWith(function(a, b) { return Math.abs(a - b) <= 1; }),
      R.take(2)
    );
    eq(R.into([], transducer, [1, 2, 3, 4, 5]), [1, 3]);
    eq(visited, [1, 2, 3]);
  });

});
