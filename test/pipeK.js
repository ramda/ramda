var assert = require('assert');

var R = require('..');


var Identity = function(x) {
  this.value = x;
};

Identity.prototype.chain = function(f) {
  return f(this.value);
};


describe('pipeK', function() {

  it('is a variadic function', function() {
    assert.strictEqual(typeof R.pipeK, 'function');
    assert.strictEqual(R.pipeK.length, 0);
  });

  it('performs left-to-right Kleisli composition', function() {
    var f = function(x) { return new Identity(x - 1); };
    var g = function(x) { return new Identity(x * x); };
    var h = function(x) { return new Identity(x + 1); };

    var fn = R.pipeK(f, g, h);
    var id = new Identity(8);

    assert.strictEqual(fn(id).value, 50);
    assert.strictEqual(fn(id).value, R.pipe(R.chain(f), R.chain(g), R.chain(h))(id).value);
  });

});
