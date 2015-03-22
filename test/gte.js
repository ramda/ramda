var assert = require('assert');

var R = require('..');


describe('gte', function() {
  it('reports whether one item is less than another', function() {
    assert.strictEqual(R.gte(3, 5), false);
    assert.strictEqual(R.gte(6, 4), true);
    assert.strictEqual(R.gte(7.0, 7.0), true);
    assert.strictEqual(R.gte('abc', 'xyz'), false);
    assert.strictEqual(R.gte('abcd', 'abc'), true);
  });

  it('is curried', function() {
    var lte20 = R.gte(20);
    assert.strictEqual(lte20(10), true);
    assert.strictEqual(lte20(20), true);
    assert.strictEqual(lte20(25), false);
  });

  it('behaves right curried when passed `R.__` for its first argument', function() {
    var gte20 = R.gte(R.__, 20);
    assert.strictEqual(gte20(10), false);
    assert.strictEqual(gte20(20), true);
    assert.strictEqual(gte20(25), true);
  });
});
