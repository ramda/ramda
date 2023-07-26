var R = require('../source/index.js');
var eq = require('./shared/eq.js');

var list = ['a', 'b', 'c', 'd', 'e', 'f'];

describe('swap', function() {
  it('swaps an element from one index to the other', function() {
    eq(R.swap(0, 1, list), ['b', 'a', 'c', 'd', 'e', 'f']);
    eq(R.swap(2, 1, list), ['a', 'c', 'b', 'd', 'e', 'f']);
    eq(R.swap(-1, 0, list), ['f', 'b', 'c', 'd', 'e', 'a']);
    eq(R.swap(4, 1, list), ['a', 'e', 'c', 'd', 'b', 'f']);
  });

  it('does nothing when indexes are outside the list boundaries', function() {
    eq(R.swap(-20, 2, list), list);
    eq(R.swap(20, 2, list), list);
    eq(R.swap(2, 20, list), list);
    eq(R.swap(2, -20, list), list);
    eq(R.swap(20, 20, list), list);
    eq(R.swap(-20, -20, list), list);
  });

  it('does nothing when indexes are equal', function() {
    eq(R.swap(0, 0, list), list);
  });

  it('should be the same when swapping index order', function() {
    eq(R.swap(0, 1, list), R.swap(1, 0, list));
  });

  it('works with lists of arrays', function() {
    eq(R.swap(0, -1, [['a', 'A'], ['b', 'B']]), [['b', 'B'], ['a', 'A']]);
  });

  it('swaps property values from one property to another', function() {
    eq(R.swap('a', 'b', {a: 1, b: 2}), {a: 2, b: 1});
    eq(R.swap('b', 'a', {a: 1, b: 2}), {a: 2, b: 1});
  });

  it('does nothing when property names are not defined', function() {
    eq(R.swap('a', 'b', {a: 1}), {a: 1});
    eq(R.swap('a', 'b', {b: 2}), {b: 2});
  });

  it('swaps characters in string from one index to another', function() {
    eq(R.swap(0, 2, 'foo'), 'oof');
  });
});
