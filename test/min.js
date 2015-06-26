var assert = require('assert');

var R = require('..');


describe('min', function() {

  it('returns the smaller of its two arguments', function() {
    assert.strictEqual(R.min(-7, 7), -7);
    assert.strictEqual(R.min(7, -7), -7);
  });

  it('works for any orderable type', function() {
    var d1 = new Date('2001-01-01');
    var d2 = new Date('2002-02-02');

    assert.strictEqual(R.min(d1, d2), d1);
    assert.strictEqual(R.min(d2, d1), d1);
    assert.strictEqual(R.min('a', 'b'), 'a');
    assert.strictEqual(R.min('b', 'a'), 'a');
  });

});
