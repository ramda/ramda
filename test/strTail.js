var assert = require('assert');

var R = require('..');


describe('strTail', function() {

  it('returns the substring containing all characters but the first', function() {
    assert.strictEqual(R.strTail('abc'), 'bc');
    assert.strictEqual(R.strTail('ab'), 'b');
    assert.strictEqual(R.strTail('a'), '');
    assert.strictEqual(R.strTail(''), '');
  });

});
