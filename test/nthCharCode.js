var assert = require('assert');

var R = require('..');


describe('nthCharCode', function() {
  it('returns the character code of the nth character of the given string', function() {
    assert.strictEqual(R.nthCharCode(2, 'Ramda'), 'm'.charCodeAt(0));
  });

  it('accepts negative offsets', function() {
    assert.strictEqual(R.nthCharCode(-2, 'Ramda'), 'd'.charCodeAt(0));
  });

  it('is curried', function() {
    assert.strictEqual(R.nthCharCode(2)('Ramda'), 'm'.charCodeAt(0));
  });
});
