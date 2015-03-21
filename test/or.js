var assert = require('assert');

var R = require('..');


describe('or', function() {
  it('compares two values with js &&', function() {
    var someAr = [];
    assert.strictEqual(R.or(1, 0), 1);
    assert.strictEqual(R.or(0, 1), 1);
    assert.strictEqual(R.or(someAr, false), someAr);
    assert.strictEqual(R.or('', 0), 0);
  });

  it('is curried', function() {
    assert.strictEqual(R.or('lie')(false), 'lie');
    assert.strictEqual(R.or(false)(true), true);
    assert.strictEqual(R.or('')(0), 0);
  });
});
