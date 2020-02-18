var R = require('../source');
var eq = require('./shared/eq');

var fn = function(a) {
  var x = a + 1;
  return function(b) {
    var y = x * b;
    return function(c) {
      return y * c;
    }
  }
};

describe('recall', function() {
  it('collapses a high-order unary function', function() {
    eq(R.recall(fn, 1, 2, 3), 12);
  });

  it('accepts no more than N arguments for an N-order function', function() {
    eq(R.recall(fn, 1, 2, 3), R.recall(fn, 1, 2, 3, 4));
  });
});
