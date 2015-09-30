var R = require('..');
var eq = require('./shared/eq');


var Identity = function(x) {
  this.value = x;
};

Identity.prototype.chain = function(f) {
  return f(this.value);
};


describe('pipeK', function() {

  it('is a variadic function', function() {
    eq(typeof R.pipeK, 'function');
    eq(R.pipeK.length, 0);
  });

  it('performs left-to-right Kleisli composition', function() {
    var f = function(x) { return new Identity(x - 1); };
    var g = function(x) { return new Identity(x * x); };
    var h = function(x) { return new Identity(x + 1); };

    var fn = R.pipeK(f, g, h);
    var id = new Identity(8);

    eq(fn(id).value, 50);
    eq(fn(id).value, R.pipe(R.chain(f), R.chain(g), R.chain(h))(id).value);
  });

  it('returns the identity function given no arguments', function() {
    var identity = R.pipeK();
    eq(identity.length, 1);
    eq(identity(R.__).length, 1);
    eq(identity(42), 42);
  });

});
