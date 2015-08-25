var assert = require('assert');

var R = require('..');


describe('containsWith', function() {

  it('determines if an element is the list based on the predicate', function() {
    var absEq = function(a, b) { return Math.abs(a) === Math.abs(b); };
    assert.strictEqual(R.containsWith(absEq, 5, [1, 2, 3]), false);
    assert.strictEqual(R.containsWith(absEq, 5, [4, 5, 6]), true);
    assert.strictEqual(R.containsWith(absEq, 5, [-1, -2, -3]), false);
    assert.strictEqual(R.containsWith(absEq, 5, [-4, -5, -6]), true);
  });

});
