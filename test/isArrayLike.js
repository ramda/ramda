var assert = require('assert');

var R = require('..');


describe('isArrayLike', function() {
  it('is true for Arrays', function() {
    assert.strictEqual(R.isArrayLike([]), true);
    assert.strictEqual(R.isArrayLike([1, 2, 3, 4]), true);
    assert.strictEqual(R.isArrayLike([null]), true);
  });

  it('is true for arguments', function() {
    function test() {
      return R.isArrayLike(arguments);
    }
    assert.strictEqual(test(), true);
    assert.strictEqual(test(1, 2, 3), true);
    assert.strictEqual(test(null), true);
  });

  it('is false for Strings', function() {
    assert.strictEqual(R.isArrayLike(''), false);
    assert.strictEqual(R.isArrayLike('abcdefg'), false);
  });

  it('is true for arbitrary objects with numeric length, if extreme indices are defined', function() {
    var obj1 = {length: 0};
    var obj2 = {0: 'something', length: 0};
    var obj3 = {0: void 0, length: 0};
    var obj4 = {0: 'zero', 1: 'one', length: 2};
    var obj5 = {0: 'zero', length: 2};
    var obj6 = {1: 'one', length: 2};
    assert.strictEqual(R.isArrayLike(obj1), true);
    assert.strictEqual(R.isArrayLike(obj2), true);
    assert.strictEqual(R.isArrayLike(obj3), true);
    assert.strictEqual(R.isArrayLike(obj4), true);
    assert.strictEqual(R.isArrayLike(obj5), false);
    assert.strictEqual(R.isArrayLike(obj6), false);
  });

  it('is false for everything else', function() {
    assert.strictEqual(R.isArrayLike(undefined), false);
    assert.strictEqual(R.isArrayLike(1), false);
    assert.strictEqual(R.isArrayLike({}), false);
    assert.strictEqual(R.isArrayLike(false), false);
    assert.strictEqual(R.isArrayLike(function() {}), false);
  });
});
