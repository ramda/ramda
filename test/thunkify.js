var R = require('..');
var eq = require('./shared/eq');

describe('thunkify', function() {
  it('returns a function with the same arity as the given function', function() {
    var input = function input(a0, a1) { };
    var f = R.thunkify(input);
    eq(typeof f, 'function');
    eq(f.length, input.length);
  });

  it('returns a function that expects arguments and returns a new invoker function', function() {
    var input = function input(a0, a1) { };
    var f = R.thunkify(input);
    eq(typeof f(42, 'xyz'), 'function');
  });

  it('calls the original function with the provided arguments', function() {
    var f = R.thunkify(R.add(2));
    eq(f(42)(), 44);
  });
});
