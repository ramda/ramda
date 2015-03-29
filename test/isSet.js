var assert = require('assert');

var R = require('..');


describe('isSet', function() {
  it('returns true if a list is composed of unique elements', function() {
    var list = [1, 2, 3, 1, 2, 3, 1, 2, 3];
    assert.strictEqual(R.isSet(list), false);
    assert.strictEqual(R.isSet([3, 1, 4, 2, 5, 7, 9]), true);
  });

  it('returns true for an empty array', function() {
    assert.strictEqual(R.isSet([]), true);
  });

  it('has Object.is semantics', function() {
    assert.strictEqual(R.isSet([0, -0]), true);
    assert.strictEqual(R.isSet([-0, 0]), true);
    assert.strictEqual(R.isSet([NaN, NaN]), false);
  });

});
