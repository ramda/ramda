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

  [0.1, 0.5, 1.1, 1.5, 2.9, 3.5, 4.5].forEach(function(n) {
    it('matches list behavior as a transducer for a count of ' + n, function() {
      var input = [1, 2, 3, 4];
      var expected = R.dropLast(n, input);
      eq(R.into([], R.dropLast(n), input), expected);
      eq(R.transduce(R.dropLast(n), R.flip(R.append), [], input), expected);
    });
  });

  [0, -0.5, -1, 1, 4].forEach(function(n) {
    it('preserves transducer behavior for a count of ' + n, function() {
      var input = [1, 2, 3, 4];
      eq(R.into([], R.dropLast(n), input), R.dropLast(n, input));
    });
  });

  it('handles an empty input with a fractional count', function() {
    eq(R.into([], R.dropLast(1.5), []), []);
  });

  it('composes fractional dropLast with a downstream take', function() {
    eq(R.into([], R.compose(R.dropLast(1.5), R.take(1)), [1, 2, 3, 4]), [1]);
  });

});
