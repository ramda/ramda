var assert = require('assert');

var R = require('..');


describe('omit', function() {
  var obj = {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6};

  it('copies an object omitting the listed properties', function() {
    assert.deepEqual(R.omit(['a', 'c', 'f'], obj), {b: 2, d: 4, e: 5});
  });

  it('includes prototype properties', function() {
    var F = function(param) {this.x = param;};
    F.prototype.y = 40; F.prototype.z = 50;
    var obj = new F(30);
    obj.v = 10; obj.w = 20;
    assert.deepEqual(R.omit(['w', 'x', 'y'], obj), {v: 10, z: 50});
  });

  if (typeof Map === 'function') {

    it('supports Map objects', function() {
      var m = R.omit([1, 3, 5], new Map([[1, 'a'], [2, 'b'], [3, 'c']]));
      assert.strictEqual(m.constructor, Map);
      assert.strictEqual(m.size, 1);
      assert.strictEqual(m.get(1), undefined);
      assert.strictEqual(m.get(2), 'b');
      assert.strictEqual(m.get(3), undefined);
    });

    it('has SameValue semantics when applied to Map object', function() {
      assert.strictEqual(R.omit([0], new Map([[-0, 'x']])).size, 0);
      assert.strictEqual(R.omit([-0], new Map([[0, 'x']])).size, 0);
      assert.strictEqual(R.omit([NaN], new Map([[NaN, 'x']])).size, 0);
    });

  }

  it('is curried', function() {
    var skipAB = R.omit(['a', 'b']);
    assert.deepEqual(skipAB(obj), {c: 3, d: 4, e: 5, f: 6});
  });
});
