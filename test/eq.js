var assert = require('assert');

var R = require('..');


describe('eq', function() {
  var a = [];
  var b = a;
  it('has Object.is semantics', function() {
    assert.strictEqual(R.eq(100, 100), true);
    assert.strictEqual(R.eq(100, '100'), false);
    assert.strictEqual(R.eq('string', 'string'), true);
    assert.strictEqual(R.eq([], []), false);
    assert.strictEqual(R.eq(a, b), true);
    assert.strictEqual(R.eq(undefined, undefined), true);
    assert.strictEqual(R.eq(null, undefined), false);

    assert.strictEqual(R.eq(-0, 0), false);
    assert.strictEqual(R.eq(0, -0), false);
    assert.strictEqual(R.eq(NaN, NaN), true);
  });

  it('is curried', function() {
    var isA = R.eq(a);
    assert.strictEqual(isA([]), false);
  });
});
