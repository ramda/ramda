var R = require('..');
var eq = require('./shared/eq');


var Identity = function(x) {
  this.value = x;
};

Identity.prototype.chain = function(f) {
  return f(this.value);
};


describe('composeK', function() {

  it('is a variadic function', function() {
    eq(typeof R.composeK, 'function');
    eq(R.composeK.length, 0);
  });

  it('performs right-to-left Kleisli composition', function() {
    var f = function(x) { return new Identity(x - 1); };
    var g = function(x) { return new Identity(x * x); };
    var h = function(x) { return new Identity(x + 1); };

    var fn = R.composeK(h, g, f);
    var id = new Identity(8);

    eq(fn(id).value, 50);
    eq(fn(id).value, R.compose(R.chain(h), R.chain(g), R.chain(f))(id).value);
  });

  it('returns the identity function given no arguments', function() {
    var identity = R.composeK();
    eq(identity.length, 1);
    eq(identity(R.__).length, 1);
    eq(identity(42), 42);
  });

});
