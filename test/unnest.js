var assert = require('assert');

var Maybe = require('sanctuary-maybe');

var R = require('..');
var eq = require('./shared/eq');


describe('unnest', function() {

  it('only flattens one layer deep of a nested list', function() {
    eq(R.unnest([[[1, 2], [3, 4]], [[5, 6], [7, 8]]]), [[1, 2], [3, 4], [5, 6], [7, 8]]);
  });

  it('is not destructive', function() {
    var nest = [[1], [2], [3]];
    assert.notStrictEqual(R.unnest(nest), nest);
  });

  it('flattens an array of empty arrays', function() {
    eq(R.unnest([[], [], []]), []);
    eq(R.unnest([]), []);
  });

  it('is equivalent to R.chain(R.identity)', function() {
    var Nothing = Maybe.Nothing;
    var Just = Maybe.Just;

    eq(R.unnest(Nothing), Nothing);
    eq(R.unnest(Just(Nothing)), Nothing);
    eq(R.unnest(Just(Just(Nothing))), Just(Nothing));
    eq(R.unnest(Just(Just(42))), Just(42));
    eq(R.unnest(Just(Just(Just(42)))), Just(Just(42)));
  });

});
