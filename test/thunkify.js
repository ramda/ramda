var R = require('../source');
var eq = require('./shared/eq');

describe('thunkify', function() {
  it('returns a function with the same arity as the given function', function() {
    var input = function input(a0, a1) { };
    var thunk = R.thunkify(input);
    eq(typeof thunk, 'function');
    eq(thunk.length, input.length);
  });

  it('returns a function that expects arguments and returns a new invoker function', function() {
    var input = function input(a0, a1) { };
    var thunk = R.thunkify(input);
    eq(typeof thunk(42, 'xyz'), 'function');
  });

  it('calls the original function with the provided arguments when all were supplied', function() {
    var thunk = R.thunkify(R.add(2));
    eq(thunk(40)(), 42);
  });
});
