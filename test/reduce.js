var R = require('..');
var eq = require('./shared/eq');

describe('reduce', function() {
  var add = function(a, b) {return a + b;};
  var mult = function(a, b) {return a * b;};

  it('folds simple functions over arrays with the supplied accumulator', function() {
    eq(R.reduce(add, 0, [1, 2, 3, 4]), 10);
    eq(R.reduce(mult, 1, [1, 2, 3, 4]), 24);
  });

  it('dispatches to objects that implement `reduce`', function() {
    var obj = {x: [1, 2, 3], reduce: function() { return 'override'; }};
    eq(R.reduce(add, 0, obj), 'override');
    eq(R.reduce(add, 10, obj), 'override');
  });

  it('returns the accumulator for an empty array', function() {
    eq(R.reduce(add, 0, []), 0);
    eq(R.reduce(mult, 1, []), 1);
    eq(R.reduce(R.concat, [], []), []);
  });

  it('is curried', function() {
    var addOrConcat = R.reduce(add);
    var sum = addOrConcat(0);
    var cat = addOrConcat('');
    eq(sum([1, 2, 3, 4]), 10);
    eq(cat(['1', '2', '3', '4']), '1234');
  });

  it('correctly reports the arity of curried versions', function() {
    var sum = R.reduce(add, 0);
    eq(sum.length, 1);
  });
});
