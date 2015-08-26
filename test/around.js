var assert = require('assert');

var R = require('..');


describe('around', function() {
  it('wraps a function with functions before and after', function() {
    assert.strictEqual(
      R.around(R.inc, R.negate, R.dec, 42),
      R.compose(R.negate, R.dec, R.inc)(42)
    );
    assert.strictEqual(
      R.around(R.identity, R.inc, R.negate, 42),
      R.compose(R.inc, R.negate)(42)
    );
    assert.strictEqual(
      R.around(R.inc, R.identity, R.negate, 42),
      R.compose(R.negate, R.inc)(42)
    );
    assert.strictEqual(
      R.around(R.inc, R.negate, R.identity, 42),
      R.compose(R.negate, R.inc)(42)
    );
  });

  it('is curried', function() {
    assert.strictEqual(
      R.around(R.inc)(R.negate)(R.dec)(42),
      R.compose(R.negate, R.dec, R.inc)(42)
    );
  });
});
