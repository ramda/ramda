var assert = require('assert');

var R = require('..');


describe('max', function() {

  it('returns the larger of its two arguments', function() {
    assert.strictEqual(R.max(-7, 7), 7);
    assert.strictEqual(R.max(7, -7), 7);
  });

  it('works for any orderable type', function() {
    var d1 = new Date('2001-01-01');
    var d2 = new Date('2002-02-02');

    assert.strictEqual(R.max(d1, d2), d2);
    assert.strictEqual(R.max(d2, d1), d2);
    assert.strictEqual(R.max('a', 'b'), 'b');
    assert.strictEqual(R.max('b', 'a'), 'b');
  });

});
