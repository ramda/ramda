var assert = require('assert');

var R = require('..');


describe('and', function() {
  it('compares two values with js &&', function() {
    var someAr = [];
    assert.strictEqual(R.and(1, 1), 1);
    assert.strictEqual(R.and(1, 0), 0);
    assert.strictEqual(R.and(true, someAr), someAr);
  });

  it('is curried', function() {
    var halfTruth = R.and(true);
    assert.strictEqual(halfTruth(false), false);
    assert.strictEqual(halfTruth('lie'), 'lie');
  });
});
