var assert = require('assert');

var R = require('../source/index.js');
var eq = require('./shared/eq.js');


describe('dropLast', function() {
  it('skips the last `n` elements from a list, returning the remainder', function() {
    eq(R.dropLast(3, ['a', 'b', 'c', 'd', 'e', 'f', 'g']), ['a', 'b', 'c', 'd']);
  });

  it('returns an empty array if `n` is too large', function() {
    eq(R.dropLast(20, ['a', 'b', 'c', 'd', 'e', 'f', 'g']), []);
  });

  it('returns an equivalent list if `n` is <= 0', function() {
    eq(R.dropLast(0, [1, 2, 3]), [1, 2, 3]);
    eq(R.dropLast(-1, [1, 2, 3]), [1, 2, 3]);
    eq(R.dropLast(-Infinity, [1, 2, 3]), [1, 2, 3]);
  });

  it('never returns the input array', function() {
    var xs = [1, 2, 3];

    assert.notStrictEqual(R.dropLast(0, xs), xs);
    assert.notStrictEqual(R.dropLast(-1, xs), xs);
  });

  it('can operate on strings', function() {
    eq(R.dropLast(3, 'Ramda'), 'Ra');
  });

  it('can act as a transducer', function() {
    var dropLast2 = R.dropLast(2);
    var input = [1, 3, 5, 7, 9, 1, 2];
    var expected = [1, 3, 5, 7, 9];
    eq(R.into([], dropLast2, input), expected);
    eq(R.transduce(dropLast2, R.flip(R.append), [], input), expected);
  });

});
