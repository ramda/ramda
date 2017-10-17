var S = require('sanctuary');

var R = require('..');
var eq = require('./shared/eq');


describe('contains', function() {
  it('returns true if an element is in a list', function() {
    eq(R.contains(7, [1, 2, 3, 9, 8, 7, 100, 200, 300]), true);
  });

  it('returns false if an element is not in a list', function() {
    eq(R.contains(99, [1, 2, 3, 9, 8, 7, 100, 200, 300]), false);
  });

  it('returns false for the empty list', function() {
    eq(R.contains(1, []), false);
  });

  it('has R.equals semantics', function() {
    eq(R.contains(0, [-0]), false);
    eq(R.contains(-0, [0]), false);
    eq(R.contains(NaN, [NaN]), true);
    eq(R.contains(S.Just([42]), [S.Just([42])]), true);
  });

});
