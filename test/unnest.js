var assert = require('assert');

var R = require('../source');
var eq = require('./shared/eq');
var Maybe = require('./shared/Maybe');


describe('unnest', function() {

  it('only flattens one layer deep of a nested list', function() {
    var nest = [1, [2], [3, [4, 5], 6, [[[7], 8]]], 9, 10];
    eq(R.unnest(nest), [1, 2, 3, [4, 5], 6, [[[7], 8]], 9, 10]);
    nest = [[[[3]], 2, 1], 0, [[-1, -2], -3]];
    eq(R.unnest(nest), [[[3]], 2, 1, 0, [-1, -2], -3]);
    eq(R.unnest([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5]);
  });

  it('is not destructive', function() {
    var nest = [1, [2], [3, [4, 5], 6, [[[7], 8]]], 9, 10];
    assert.notStrictEqual(R.unnest(nest), nest);
  });

  it('handles array-like objects', function() {
    var o = {length: 3, 0: [1, 2, [3]], 1: [], 2: ['a', 'b', 'c', ['d', 'e']]};
    eq(R.unnest(o), [1, 2, [3], 'a', 'b', 'c', ['d', 'e']]);
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
