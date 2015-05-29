var assert = require('assert');

var R = require('..');

describe('mapKeys', function() {
  it('returns an object with each of the keys passed set to value returned for it by the given function', function() {
    assert.deepEqual(R.mapKeys(R.toUpper, ['a', 'b', 'c']), {a: 'A', b: 'B', c: 'C'});
  });
});
