var assert = require('assert');

var R = require('..');


describe('lt', function() {
  it('reports whether one item is less than another', function() {
    assert.strictEqual(R.lt(3, 5), true);
    assert.strictEqual(R.lt(6, 4), false);
    assert.strictEqual(R.lt(7.0, 7.0), false);
    assert.strictEqual(R.lt('abc', 'xyz'), true);
    assert.strictEqual(R.lt('abcd', 'abc'), false);
  });

  it('is curried', function() {
    var gt5 = R.lt(5);
    assert.strictEqual(gt5(10), true);
    assert.strictEqual(gt5(5), false);
    assert.strictEqual(gt5(3), false);
  });

  it('behaves right curried when passed `R.__` for its first argument', function() {
    var lt5 = R.lt(R.__, 5);
    assert.strictEqual(lt5(10), false);
    assert.strictEqual(lt5(5), false);
    assert.strictEqual(lt5(3), true);
  });
});
