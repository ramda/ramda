var assert = require('assert');

var R = require('..');


describe('unless', function() {
  it('calls the whenFalse function if the validator returns a falsey value', function() {
    assert.deepEqual(R.unless(R.isArrayLike, R.of)(10), [10]);
  });

  it('returns the argument unmodified if the validator returns a truthy value', function() {
    assert.deepEqual(R.unless(R.isArrayLike, R.of)([10]), [10]);
  });

  it('returns a curried function', function() {
    assert.deepEqual(R.unless(R.isArrayLike)(R.of)(10), [10]);
    assert.deepEqual(R.unless(R.isArrayLike)(R.of)([10]), [10]);
  });
});
