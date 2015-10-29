var assert = require('assert');

var R = require('..');
var eq = require('./shared/eq');


describe('take', function() {

  it('takes only the first `n` elements from a list', function() {
    eq(R.take(3, ['a', 'b', 'c', 'd', 'e', 'f', 'g']), ['a', 'b', 'c']);
  });

  it('returns only as many as the array can provide', function() {
    eq(R.take(3, [1, 2]), [1, 2]);
    eq(R.take(3, []), []);
  });

  it('returns an equivalent list if `n` is < 0', function() {
    eq(R.take(-1, [1, 2, 3]), [1, 2, 3]);
    eq(R.take(-Infinity, [1, 2, 3]), [1, 2, 3]);
  });

  it('never returns the input array', function() {
    var xs = [1, 2, 3];

    assert.notStrictEqual(R.take(3, xs), xs);
    assert.notStrictEqual(R.take(Infinity, xs), xs);
    assert.notStrictEqual(R.take(-1, xs), xs);
  });

  it('can operate on strings', function() {
    eq(R.take(3, 'Ramda'), 'Ram');
    eq(R.take(2, 'Ramda'), 'Ra');
    eq(R.take(1, 'Ramda'), 'R');
    eq(R.take(0, 'Ramda'), '');
  });

  it('handles zero correctly (#1224)', function() {
    eq(R.into([], R.take(0), [1, 2, 3]), []);
  });

  it('can take items from an iterator', function() {
    const range = R.xrange(1, 0, Infinity);
    eq(R.take(5, range), [0, 1, 2, 3, 4]);
  });

  it('is refrentially transparent', function() {
    const natural = R.xrange(1, 1, Infinity);
    eq(R.take(5, natural), [1, 2, 3, 4, 5]);
    eq(R.take(5, natural), [1, 2, 3, 4, 5]);
  });

});
