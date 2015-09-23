var assert = require('assert');

var R = require('..');


describe('compose', function() {

  it('is a variadic function', function() {
    assert.strictEqual(typeof R.compose, 'function');
    assert.strictEqual(R.compose.length, 0);
  });

  it('performs right-to-left function composition', function() {
    //  f :: (String, Number?) -> ([Number] -> [Number])
    var f = R.compose(R.map, R.multiply, parseInt);

    assert.strictEqual(f.length, 2);
    assert.deepEqual(f('10')([1, 2, 3]), [10, 20, 30]);
    assert.deepEqual(f('10', 2)([1, 2, 3]), [2, 4, 6]);
  });

  it('passes context to functions', function() {
    function x(val) {
      return this.x * val;
    }
    function y(val) {
      return this.y * val;
    }
    function z(val) {
      return this.z * val;
    }
    var context = {
      a: R.compose(x, y, z),
      x: 4,
      y: 2,
      z: 1
    };
    assert.strictEqual(context.a(5), 40);
  });

  it('throws if given no arguments', function() {
    assert.throws(
      function() { R.compose(); },
      function(err) {
        return err.constructor === Error &&
               err.message === 'compose requires at least one argument';
      }
    );
  });

  it('can be applied to one argument', function() {
    var f = function(a, b, c) { return [a, b, c]; };
    var g = R.compose(f);
    assert.strictEqual(g.length, 3);
    assert.deepEqual(g(1, 2, 3), [1, 2, 3]);
  });

});
