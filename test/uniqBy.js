var Maybe = require('sanctuary-maybe');

var R = require('..');
var eq = require('./shared/eq');


describe('uniqBy', function() {

  it('returns a set from any array based on predicate', function() {
    eq(R.uniqBy(Math.abs, [-2, -1, 0, 1, 2]), [-2, -1, 0]);
  });

  it('keeps elements from the left', function() {
    eq(R.uniqBy(Math.abs, [-1, 2, 4, 3, 1, 3]), [-1, 2, 4, 3]);
  });

  it('returns an empty array for an empty array', function() {
    eq(R.uniqBy(R.identity, []), []);
  });

  it('has R.equals semantics', function() {
    eq(R.uniqBy(R.identity, [-0, 0]).length, 2);
    eq(R.uniqBy(R.identity, [NaN, NaN]).length, 1);
    eq(R.uniqBy(R.identity, [Maybe.Just([1, 2, 3]), Maybe.Just([1, 2, 3])]).length, 1);
  });

});
