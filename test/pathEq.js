var assert = require('assert');

var R = require('..');


describe('pathEq', function() {

  var obj = {
    a: 1,
    b: {
      ba: '2'
    }
  };

  it('returns true if the path matches the value', function() {
    assert.strictEqual(R.pathEq(['a'], 1, obj), true);
    assert.strictEqual(R.pathEq(['b', 'ba'], '2', obj), true);
  });

  it('returns false for non matches', function() {
    assert.strictEqual(R.pathEq(['a'], '1', obj), false);
    assert.strictEqual(R.pathEq(['b', 'ba'], 2, obj), false);
  });

  it('returns false for non existing values', function() {
    assert.strictEqual(R.pathEq(['c'], 'foo', obj), false);
    assert.strictEqual(R.pathEq(['c', 'd'], 'foo', obj), false);
  });

  it('accepts empty path', function() {
    assert.strictEqual(R.pathEq([], 42, {a: 1, b: 2}), false);
    assert.strictEqual(R.pathEq([], obj, obj), true);
  });

  it('has R.equals semantics', function() {
    function Just(x) { this.value = x; }
    Just.prototype.equals = function(x) {
      return x instanceof Just && R.equals(x.value, this.value);
    };

    assert.strictEqual(R.pathEq(['value'], 0, {value: -0}), false);
    assert.strictEqual(R.pathEq(['value'], -0, {value: 0}), false);
    assert.strictEqual(R.pathEq(['value'], NaN, {value: NaN}), true);
    assert.strictEqual(R.pathEq(['value'], new Just([42]), {value: new Just([42])}), true);
  });

});
