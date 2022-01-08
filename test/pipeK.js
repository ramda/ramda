var jsv = require('jsverify');
var assert = require('assert');

var R = require('../source');
var eq = require('./shared/eq');


var Identity = function(x) {
  this.value = x;
};

Identity.prototype.chain = function(f) {
  return f(this.value);
};

function IdentityArb(arb) {
  return arb.smap(function(x) { return new Identity(x); }, function(i) { return i.value; });
}

describe('pipeK', function() {

  it('is a variadic function', function() {
    eq(typeof R.pipeK, 'function');
    eq(R.pipeK.length, 0);
  });

  jsv.property('performs left-to-right Kleisli composition',
    jsv.fn(IdentityArb(jsv.number)),
    jsv.fn(IdentityArb(jsv.number)),
    jsv.fn(IdentityArb(jsv.number)),
    jsv.number,
    function(f, g, h, x) {
      var actual = R.pipeK(f, g, h)(x).value;
      var expected = R.chain(h, R.chain(g, f(x))).value;
      return actual === expected;
    }
  );

  it('throws if given no arguments', function() {
    assert.throws(
      function() { R.pipeK(); },
      function(err) {
        return err.constructor === Error &&
          err.message === 'pipeK requires at least one argument';
      }
    );
  });
});
