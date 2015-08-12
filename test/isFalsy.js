var assert = require('assert');
var R = require('..');

describe('isFalsy', function() {
  it('tests falsiness of a value', function() {
    assert.strictEqual(R.isFalsy(void 0), true);
    assert.strictEqual(R.isFalsy(null), true);
    assert.strictEqual(R.isFalsy([]), false);
    assert.strictEqual(R.isFalsy({}), false);
    assert.strictEqual(R.isFalsy(0), true);
    assert.strictEqual(R.isFalsy(1), false);
    assert.strictEqual(R.isFalsy(''), true);
    assert.strictEqual(R.isFalsy(NaN), true);
  });
});
