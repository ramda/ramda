var assert = require('assert');

var R = require('..');


describe('containsBy', function() {

  it('determines whether a projected list contains a projected value', function() {
    assert.strictEqual(R.containsBy(Math.abs, 5, [1, 2, 3]), false);
    assert.strictEqual(R.containsBy(Math.abs, 5, [4, 5, 6]), true);
    assert.strictEqual(R.containsBy(Math.abs, 5, [-1, -2, -3]), false);
    assert.strictEqual(R.containsBy(Math.abs, 5, [-4, -5, -6]), true);
  });

});
