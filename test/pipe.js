var assert = require('assert');

var R = require('..');


describe('pipe', function() {
  function a(x) {return x + 'A';}
  function b(x) {return x + 'B';}
  function c(x) {return x + 'C';}
  function d(x) {return x + 'D';}

  it('executes its passed in functions in order from left to right', function() {
    assert.strictEqual(R.pipe(a, b, c, d)(''), 'ABCD');
  });

  it('first function is passed multiple args', function() {
    function e(a, b, c) {
      return c + 'E';
    }
    assert.strictEqual(R.pipe(e, a, b, c)(1, 2, 3), '3EABC');
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
      a: R.pipe(x, y, z),
      x: 4,
      y: 2,
      z: 1
    };
    assert.strictEqual(context.a(5), 40);
  });

  it('throws if given no arguments', function() {
    assert.throws(function() { R.pipe(); });
  });

  it('can be applied to one argument', function() {
    var f = function(a, b, c) { return [a, b, c]; };
    var g = R.pipe(f);
    assert.strictEqual(g.length, 3);
    assert.deepEqual(g(1, 2, 3), [1, 2, 3]);
  });

  it('returns a curried function', function() {
    function f(a, b, c) { return [a, b, c].join('_'); }
    function g(x) { return x + '_END'; }
    var p = R.pipe(f, g);
    assert.strictEqual(p.length, 3);
    assert.strictEqual(typeof p('A'), 'function');
    assert.strictEqual(typeof p('A')('B'), 'function');
    assert.strictEqual(p('A')('B')('C'), p('A', 'B', 'C'));
    assert.strictEqual(p('A')('B')('C'), 'A_B_C_END');

  });
});
