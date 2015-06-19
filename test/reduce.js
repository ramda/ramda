var assert = require('assert');

var R = require('..');

describe('reduce', function() {
  var add = function(a, b) {return a + b;};
  var mult = function(a, b) {return a * b;};

  it('folds simple functions over arrays with the supplied accumulator', function() {
    assert.strictEqual(R.reduce(add, 0, [1, 2, 3, 4]), 10);
    assert.strictEqual(R.reduce(mult, 1, [1, 2, 3, 4]), 24);
  });

  it('dispatches to objects that implement `reduce`', function() {
    var obj = {x: [1, 2, 3], reduce: function() { return 'override'; }};
    assert.strictEqual(R.reduce(add, 0, obj), 'override');
    assert.strictEqual(R.reduce(add, 10, obj), 'override');
  });

  it('returns the accumulator for an empty array', function() {
    assert.strictEqual(R.reduce(add, 0, []), 0);
    assert.strictEqual(R.reduce(mult, 1, []), 1);
    assert.deepEqual(R.reduce(R.concat, [], []), []);
  });

  it('is curried', function() {
    var addOrConcat = R.reduce(add);
    var sum = addOrConcat(0);
    var cat = addOrConcat('');
    assert.strictEqual(sum([1, 2, 3, 4]), 10);
    assert.strictEqual(cat(['1', '2', '3', '4']), '1234');
  });

  it('correctly reports the arity of curried versions', function() {
    var sum = R.reduce(add, 0);
    assert.strictEqual(sum.length, 1);
  });
});
