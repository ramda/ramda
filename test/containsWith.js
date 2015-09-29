var R = require('..');
var eq = require('./shared/eq');


describe('containsWith', function() {

  it('determines if an element is the list based on the predicate', function() {
    var absEq = function(a, b) { return Math.abs(a) === Math.abs(b); };
    eq(R.containsWith(absEq, 5, [1, 2, 3]), false);
    eq(R.containsWith(absEq, 5, [4, 5, 6]), true);
    eq(R.containsWith(absEq, 5, [-1, -2, -3]), false);
    eq(R.containsWith(absEq, 5, [-4, -5, -6]), true);
  });

});
