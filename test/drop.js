var assert = require('assert');

var R = require('../source');
var eq = require('./shared/eq');


describe('drop', function() {

  it('skips the first `n` elements from a list, returning the remainder', function() {
    eq(R.drop(3, ['a', 'b', 'c', 'd', 'e', 'f', 'g']), ['d', 'e', 'f', 'g']);
  });

  it('returns an empty array if `n` is too large', function() {
    eq(R.drop(20, ['a', 'b', 'c', 'd', 'e', 'f', 'g']), []);
  });

  it('returns an equivalent list if `n` is <= 0', function() {
    eq(R.drop(0, [1, 2, 3]), [1, 2, 3]);
    eq(R.drop(-1, [1, 2, 3]), [1, 2, 3]);
    eq(R.drop(-Infinity, [1, 2, 3]), [1, 2, 3]);
  });

  it('never returns the input array', function() {
    var xs = [1, 2, 3];

    assert.notStrictEqual(R.drop(0, xs), xs);
    assert.notStrictEqual(R.drop(-1, xs), xs);
  });

  it('can operate on strings', function() {
    eq(R.drop(3, 'Ramda'), 'da');
    eq(R.drop(4, 'Ramda'), 'a');
    eq(R.drop(5, 'Ramda'), '');
    eq(R.drop(6, 'Ramda'), '');
  });

});
