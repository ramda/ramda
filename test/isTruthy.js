var assert = require('assert');
var R = require('..');

describe('isTruthy', function() {
  it('tests truthiness of a value', function() {
    assert.strictEqual(R.isTruthy(void 0), false);
    assert.strictEqual(R.isTruthy(null), false);
    assert.strictEqual(R.isTruthy([]), true);
    assert.strictEqual(R.isTruthy({}), true);
    assert.strictEqual(R.isTruthy(0), false);
    assert.strictEqual(R.isTruthy(1), true);
    assert.strictEqual(R.isTruthy(''), false);
    assert.strictEqual(R.isTruthy(NaN), false);
  });
});
