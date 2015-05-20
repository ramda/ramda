var assert = require('assert');

var R = require('..');


describe('identical', function() {
  var a = [];
  var b = a;
  it('has Object.is semantics', function() {
    assert.strictEqual(R.identical(100, 100), true);
    assert.strictEqual(R.identical(100, '100'), false);
    assert.strictEqual(R.identical('string', 'string'), true);
    assert.strictEqual(R.identical([], []), false);
    assert.strictEqual(R.identical(a, b), true);
    assert.strictEqual(R.identical(undefined, undefined), true);
    assert.strictEqual(R.identical(null, undefined), false);

    assert.strictEqual(R.identical(-0, 0), false);
    assert.strictEqual(R.identical(0, -0), false);
    assert.strictEqual(R.identical(NaN, NaN), true);

    assert.strictEqual(R.identical(NaN, 42), false);
    assert.strictEqual(R.identical(42, NaN), false);

    /* jshint -W053 */
    assert.strictEqual(R.identical(0, new Number(0)), false);
    assert.strictEqual(R.identical(new Number(0), 0), false);
    assert.strictEqual(R.identical(new Number(0), new Number(0)), false);
    /* jshint +W053 */
  });

  it('is curried', function() {
    var isA = R.identical(a);
    assert.strictEqual(isA([]), false);
  });
});
