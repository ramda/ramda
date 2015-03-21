var assert = require('assert');

var R = require('..');


describe('test', function() {
  it('returns true if string matches pattern', function() {
    assert.strictEqual(R.test(/^x/, 'xyz'), true);
  });

  it('returns false if string does not match pattern', function() {
    assert.strictEqual(R.test(/^y/, 'xyz'), false);
  });

  it('is referentially transparent', function() {
    var pattern = /x/g;
    assert.strictEqual(pattern.lastIndex, 0);
    assert.strictEqual(R.test(pattern, 'xyz'), true);
    assert.strictEqual(pattern.lastIndex, 0);
    assert.strictEqual(R.test(pattern, 'xyz'), true);
  });
});
