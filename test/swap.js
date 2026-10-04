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

  it('does nothing when either index equals the list length', function() {
    eq(R.swap(0, list.length, list), list);
    eq(R.swap(list.length, 0, list), list);
    eq(R.swap(-1, list.length, list), list);
    eq(R.swap(list.length, -1, list), list);
    eq(R.swap(0, 1, ['a']), ['a']);
    eq(R.swap(0, 0, []), []);
  });

  it('does nothing when either index equals the string length', function() {
    eq(R.swap(0, 3, 'abc'), 'abc');
    eq(R.swap(3, 0, 'abc'), 'abc');
    eq(R.swap(-1, 3, 'abc'), 'abc');
    eq(R.swap(3, -1, 'abc'), 'abc');
    eq(R.swap(0, 1, 'a'), 'a');
    eq(R.swap(0, 0, ''), '');
  });

  it('still swaps the first and last valid indexes without changing the input', function() {
    var input = ['a', 'b', 'c'];
    eq(R.swap(0, input.length - 1, input), ['c', 'b', 'a']);
    eq(R.swap(-input.length, -1, input), ['c', 'b', 'a']);
    eq(input, ['a', 'b', 'c']);
    eq(R.swap(-3, -1, 'abc'), 'cba');
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
