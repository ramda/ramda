var assert = require('assert');

var R = require('..');


var Identity = function(x) {
  this.value = x;
};

Identity.prototype.chain = function(f) {
  return f(this.value);
};


describe('composeK', function() {

  it('is a variadic function', function() {
    assert.strictEqual(typeof R.composeK, 'function');
    assert.strictEqual(R.composeK.length, 0);
  });

  it('performs right-to-left Kleisli composition', function() {
    var f = function(x) { return new Identity(x - 1); };
    var g = function(x) { return new Identity(x * x); };
    var h = function(x) { return new Identity(x + 1); };

    var fn = R.composeK(h, g, f);
    var id = new Identity(8);

    assert.strictEqual(fn(id).value, 50);
    assert.strictEqual(fn(id).value, R.compose(R.chain(h), R.chain(g), R.chain(f))(id).value);
  });

});
