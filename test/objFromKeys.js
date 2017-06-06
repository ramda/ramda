var assert = require('assert');

var R = require('..');

describe('objFromKeys', function() {
  it('returns an object with each of the keys passed set to value returned for it by the given function', function() {
    assert.deepEqual(R.objFromKeys(R.toUpper, ['a', 'b', 'c']), {a: 'A', b: 'B', c: 'C'});
  });

  it('is curried', function() {
    assert.deepEqual(R.objFromKeys(R.always(0))(['a', 'b', 'c']), {a: 0, b: 0, c: 0});
  });

  it('last wins for duplicated keys', function() {
    var callCount = 0;
    assert.deepEqual(R.objFromKeys(function() { return ++callCount; }, ['a', 'b', 'a']),
                     {a: 3, b: 2});
  });

  it('an empty object is returned for an empty list', function() {
    assert.deepEqual(R.objFromKeys(R.always(0), []), {});
  });
});
