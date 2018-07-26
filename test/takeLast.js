var assert = require('assert');

var R = require('../source');
var eq = require('./shared/eq');


describe('takeLast', function() {

  it('takes only the last `n` elements from a list', function() {
    eq(R.takeLast(3, ['a', 'b', 'c', 'd', 'e', 'f', 'g']), ['e', 'f', 'g']);
  });

  it('returns only as many as the array can provide', function() {
    eq(R.takeLast(3, [1, 2]), [1, 2]);
    eq(R.takeLast(3, []), []);
  });

  it('returns an equivalent list if `n` is < 0', function() {
    eq(R.takeLast(-1, [1, 2, 3]), [1, 2, 3]);
    eq(R.takeLast(-Infinity, [1, 2, 3]), [1, 2, 3]);
  });

  it('never returns the input array', function() {
    var xs = [1, 2, 3];

    assert.notStrictEqual(R.takeLast(3, xs), xs);
    assert.notStrictEqual(R.takeLast(Infinity, xs), xs);
    assert.notStrictEqual(R.takeLast(-1, xs), xs);
  });

  it('can operate on strings', function() {
    eq(R.takeLast(3, 'Ramda'), 'mda');
  });

  it('handles zero correctly (#1224)', function() {
    eq(R.takeLast(0, [1, 2, 3]), []);
  });

});
