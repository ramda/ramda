var assert = require('assert');

var R = require('..');


describe('reduceRightLazy', function() {
  var plusThunk = function(a, b) { return a() + b; };

  it('folds lists with right-associativity', function() {
    assert.strictEqual(
      R.reduceRightLazy(plusThunk, '', ['a', 'b', 'c', 'd']),
      'dcba'
    );
  });

  it('folds functions over arrays with the supplied accumulator', function() {
    assert.strictEqual(R.reduceRightLazy(plusThunk, 0, [12, 4, 10, 6]), 32);
  });

  it('returns the accumulator for an empty array', function() {
    assert.strictEqual(R.reduceRightLazy(plusThunk, 0, []), 0);
  });

  it('is curried', function() {
    var sum = R.reduceRightLazy(plusThunk, 0);
    assert.strictEqual(sum([12, 4, 10, 6]), 32);
  });

  it('correctly reports the arity of curried versions', function() {
    var sum = R.reduceRightLazy(plusThunk, 0);
    assert.strictEqual(sum.length, 1);
  });

  it('short-circuits when the accumulator thunk is not evaluated', function() {
    var count = 0;
    var found2 = R.reduceRightLazy(function(acc, a) {
      count++;
      return a === 2 || acc();
    }, false, [1, 2, 3, 4]);
    assert.strictEqual(count, 2);
    assert.strictEqual(found2, true);
  });
});
