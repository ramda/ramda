var assert = require('assert');

var R = require('..');


describe('strInit', function() {

  it('returns the substring containing all characters but the last', function() {
    assert.strictEqual(R.strInit('abc'), 'ab');
    assert.strictEqual(R.strInit('ab'), 'a');
    assert.strictEqual(R.strInit('a'), '');
    assert.strictEqual(R.strInit(''), '');
  });

});
