var R = require('..');
var eq = require('./shared/eq');

describe('thunk', function() {
  it('applies function only to arguments given initially', function() {
    var add = function(a, b) { return a + b; };
    var sum = function() {
      return [].reduce.call(arguments, add, 0);
    };

    eq(R.thunk(sum, 1, 1)(5), 2);
  });

  it('reports the arity of the new function as zero', function() {
    var f = R.thunk(R.add(1));
    eq(f.length, 0);
  });
});
