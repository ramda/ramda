var assert = require('assert');

var R = require('..');


describe('modes', function() {

  it('returns the most common values', function() {
    assert.deepEqual(R.modes([]), []);
    assert.deepEqual(R.modes([1, 2, 2, 2, 1]), [2]);
    assert.deepEqual(R.modes([1, 2, 3, 2, 1]), [1, 2]);
  });

  it('determines object equality by identity', function() {
    var a = {};
    var m = {};
    var d = {};
    var result = R.modes([R, a, m, d, a]);
    assert.strictEqual(Object.prototype.toString.call(result), '[object Array]');
    assert.strictEqual(result.length, 1);
    assert.strictEqual(result[0], a);
  });

  it('has Object.is semantics', function() {
    assert.strictEqual(R.modes([0, -0]).length, 2);
    assert.strictEqual(R.modes([-0, 0]).length, 2);
    assert.strictEqual(R.modes([NaN, NaN]).length, 1);
  });

});
