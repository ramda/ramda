var assert = require('assert');

var R = require('..');


describe('lensIndex', function() {

  var headOf = R.lensIndex(0);

  it('retrieves the nth value from an array as defined by the `n` parameter', function() {
    assert.strictEqual(headOf([10, 20, 30, 40]), 10);
    assert.strictEqual(headOf(['a', 'b', 'c', 'd']), 'a');
  });

  it('"sets" a value a position `n`, returning a new array', function() {
    assert.deepEqual(headOf.set('cow', [1, 2, 3, 4]), ['cow', 2, 3, 4]);
  });

  it('the setter should not mutate the object', function() {
    var xs = [1, 2, 3, 4];
    assert.deepEqual(headOf.set(10, xs), [10, 2, 3, 4]);
    assert.deepEqual(xs, [1, 2, 3, 4]);
  });

  it('maps an index from getter to setter', function() {
    function plus10(x) { return x + 10; }
    assert.deepEqual(headOf.map(plus10, [-9, 2, 3]), [1, 2, 3]);
  });

  it('the modifier should not mutate the object', function() {
    var xs = ['a', 'b', 'c'];
    function uc(s) { return s.toUpperCase(); }
    assert.deepEqual(headOf.map(uc, xs), ['A', 'b', 'c']);
    assert.deepEqual(xs, ['a', 'b', 'c']);
  });

  it('curries map and set and modifies with composed lens', function() {
    var headPlus3 = R.compose(headOf.map(R.add(1)), headOf.map(R.add(2)));
    assert.deepEqual(headPlus3([-2, 2, 3]), [1, 2, 3]);
    var set0Plus1 = R.compose(headOf.map(R.add(1)), headOf.set(0));
    assert.deepEqual(set0Plus1([-2, 2, 3]), [1, 2, 3]);
    var mapHeadPlus3 = R.map(headPlus3);
    assert.deepEqual(mapHeadPlus3([[-2, 2, 3], [-1, 2, 3]]), [[1, 2, 3], [2, 2, 3]]);
  });
});
