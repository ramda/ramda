var assert = require('assert');

var R = require('..');


describe('lte', function() {
  it('reports whether one item is less than another', function() {
    assert.strictEqual(R.lte(3, 5), true);
    assert.strictEqual(R.lte(6, 4), false);
    assert.strictEqual(R.lte(7.0, 7.0), true);
    assert.strictEqual(R.lte('abc', 'xyz'), true);
    assert.strictEqual(R.lte('abcd', 'abc'), false);
  });

  it('is curried', function() {
    var gte20 = R.lte(20);
    assert.strictEqual(gte20(10), false);
    assert.strictEqual(gte20(20), true);
    assert.strictEqual(gte20(25), true);
  });

  it('behaves right curried when passed `R.__` for its first argument', function() {
    var upTo20 = R.lte(R.__, 20);
    assert.strictEqual(upTo20(10), true);
    assert.strictEqual(upTo20(20), true);
    assert.strictEqual(upTo20(25), false);
  });
});
