var R = require('..');
var eq = require('./shared/eq');


describe('partition', function() {
  it('splits a list into two lists according to a predicate', function() {
    var pred = function(n) { return n % 2; };
    eq(R.partition(pred, []), [[], []]);
    eq(R.partition(pred, [0, 2, 4, 6]), [[], [0, 2, 4, 6]]);
    eq(R.partition(pred, [1, 3, 5, 7]), [[1, 3, 5, 7], []]);
    eq(R.partition(pred, [0, 1, 2, 3]), [[1, 3], [0, 2]]);
  });

  it('is curried', function() {
    var polarize = R.partition(Boolean);
    eq(polarize([true, 0, 1, null]), [[true, 1], [0, null]]);
  });
});
