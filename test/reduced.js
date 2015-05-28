var assert = require('assert');

var R = require('..');


describe('reduced', function() {
  it('wraps a value', function() {
    // white box test.
    var v = {};
    assert.strictEqual(R.reduced(v)['@@transducer/value'], v);
  });

  it('flags value as reduced', function() {
    // white box test.
    assert.strictEqual(R.reduced({})['@@transducer/reduced'], true);
  });

  it('short-circuits reduce', function() {
    // black box test.
    assert.strictEqual(
      R.reduce(
        function(acc, v) {
          var result = acc + v;
          if (result >= 10) {result = R.reduced(result);}
          return result;
        },
        0,
        [1, 2, 3, 4, 5]),
      10);
  });
});
