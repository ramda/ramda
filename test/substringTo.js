var assert = require('assert');

var R = require('..');


describe('substringTo', function() {
  it('returns the trailing substring of a string', function() {
    assert.strictEqual(R.substringTo(8, 'abcdefghijklm'), 'abcdefgh');
  });

  it('accepts negative offsets', function() {
    assert.strictEqual(R.substringTo(-2, 'Ramda'), 'Ram');
  });

  it('is curried', function() {
    var through8 = R.substringTo(8);
    assert.strictEqual(through8('abcdefghijklm'), 'abcdefgh');
  });
});
