var assert = require('assert');

var R = require('..');


describe('strTake', function() {

  it('returns the substring containing the first N characters', function() {
    assert.strictEqual(R.strTake(0, 'abc'), '');
    assert.strictEqual(R.strTake(1, 'abc'), 'a');
    assert.strictEqual(R.strTake(2, 'abc'), 'ab');
    assert.strictEqual(R.strTake(3, 'abc'), 'abc');
    assert.strictEqual(R.strTake(4, 'abc'), 'abc');
  });

});
