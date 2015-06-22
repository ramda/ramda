var assert = require('assert');

var R = require('..');


describe('strDrop', function() {

  it('returns the substring containing all but the first N characters', function() {
    assert.strictEqual(R.strDrop(0, 'abc'), 'abc');
    assert.strictEqual(R.strDrop(1, 'abc'), 'bc');
    assert.strictEqual(R.strDrop(2, 'abc'), 'c');
    assert.strictEqual(R.strDrop(3, 'abc'), '');
    assert.strictEqual(R.strDrop(4, 'abc'), '');
  });

});
