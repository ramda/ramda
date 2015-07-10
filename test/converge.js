var assert = require('assert');

var R = require('..');


//  square :: Number -> Number
var square = function(n) { return n * n; };


describe('converge', function() {

  it('is a ternary function', function() {
    assert.strictEqual(typeof R.converge, 'function');
    assert.strictEqual(R.converge.length, 3);
  });

  it('diverges and converges', function() {
    assert.strictEqual(R.converge(R.subtract, square, R.inc)(10), (10 * 10) - (10 + 1));
  });

  it('passes context to its functions', function() {
    var c = function(a, b) { return this.f(a, b); };
    var f = function(a) { return this.x + a; };
    var g = function(a) { return this.x - a; };
    var ctx = {
      f: function(a, b) { return Math.pow(a - b, this.x); },
      x: 3
    };

    assert.strictEqual(R.converge(c, f, g).call(ctx, 0), 0);  // Math.pow((3 + 0) - (3 - 0), 3)
    assert.strictEqual(R.converge(c, f, g).call(ctx, 1), 8);  // Math.pow((3 + 1) - (3 - 1), 3)
    assert.strictEqual(R.converge(c, f, g).call(ctx, 2), 64); // Math.pow((3 + 2) - (3 - 2), 3)
  });

  it('is curried', function() {
    assert.strictEqual(R.converge(R.subtract).length, 2);
    assert.strictEqual(R.converge(R.subtract)(square).length, 1);
  });

});
