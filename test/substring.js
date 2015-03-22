var assert = require('assert');

var R = require('..');


describe('substring', function() {
  it('returns the substring of a string', function() {
    assert.strictEqual(R.substring(2, 5, 'abcdefghijklm'), 'cde');
  });

  it('accepts negative offsets', function() {
    assert.strictEqual(R.substring(0, -2, 'Ramda'), 'Ram');
    assert.strictEqual(R.substring(-4, 3, 'Ramda'), 'am');
    assert.strictEqual(R.substring(-4, -2, 'Ramda'), 'am');
  });

  it('is curried', function() {
    var from2 = R.substring(2);
    assert.strictEqual(from2(5, 'abcdefghijklm'), 'cde');
    var from2to5 = R.substring(2, 5);
    assert.strictEqual(from2to5('abcdefghijklm'), 'cde');
  });
});
