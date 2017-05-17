var assert = require('assert');

var R = require('..');


describe('allUniq', function() {
  it('returns true if a list is composed of unique elements', function() {
    var list = [1, 2, 3, 1, 2, 3, 1, 2, 3];
    assert.strictEqual(R.allUniq(list), false);
    assert.strictEqual(R.allUniq([3, 1, 4, 2, 5, 7, 9]), true);
  });

  it('returns true for an empty array', function() {
    assert.strictEqual(R.allUniq([]), true);
  });

  it('has R.equals semantics', function() {
    function Just(x) { this.value = x; }
    Just.prototype.equals = function(x) {
      return x instanceof Just && R.equals(x.value, this.value);
    };

    assert.strictEqual(R.allUniq([0, -0]), true);
    assert.strictEqual(R.allUniq([-0, 0]), true);
    assert.strictEqual(R.allUniq([NaN, NaN]), false);
    assert.strictEqual(R.allUniq([new Just([42]), new Just([42])]), false);
  });

});
