var R = require('..');
var eq = require('./shared/eq');

var isOdd = function(_, x) {return x % 2 === 1; };

describe('reduceWhile', function() {
  it('reduces until its predicate fails', function() {
    eq(R.reduceWhile(isOdd, R.add, 0, [1, 3, 1, 5, 20, 7, 7, 7]), 10);
  });

  it('returns its accumulator when given an empty array', function() {
    eq(R.reduceWhile(isOdd, R.add, 101, []), 101);
  });

});
