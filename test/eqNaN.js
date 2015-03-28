var assert = require('assert');

var R = require('..');


describe('eqNaN', function() {

  it('returns true for `NaN`', function() {
    assert.strictEqual(R.eqNaN(NaN), true);

    assert.strictEqual(isNaN(NaN), true);
  });

  it('returns false for `new Number(NaN)`', function() {
    /* jshint -W053 */
    assert.strictEqual(R.eqNaN(new Number(NaN)), false);
    /* jshint +W053 */
  });

  it('returns false for any other value', function() {
    assert.strictEqual(R.eqNaN(void 0), false);
    assert.strictEqual(R.eqNaN({}), false);

    assert.strictEqual(isNaN(void 0), true);
    assert.strictEqual(isNaN({}), true);
  });

});
