var assert = require('assert');

var R = require('..');


describe('nthChar', function() {
  it('returns the nth character of the given string', function() {
    assert.strictEqual(R.nthChar(2, 'Ramda'), 'm');
  });

  it('accepts negative offsets', function() {
    assert.strictEqual(R.nthChar(-2, 'Ramda'), 'd');
  });

  it('is curried', function() {
    assert.strictEqual(R.nthChar(2)('Ramda'), 'm');
  });
});
