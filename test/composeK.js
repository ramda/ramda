var assert = require('assert');
var jsv = require('jsverify');

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

describe('composeK', function() {

  it('is a variadic function', function() {
    eq(typeof R.composeK, 'function');
    eq(R.composeK.length, 0);
  });

  jsv.property('performs right-to-left Kleisli composition',
    jsv.fn(IdentityArb(jsv.number)),
    jsv.fn(IdentityArb(jsv.number)),
    jsv.fn(IdentityArb(jsv.number)),
    jsv.number,
    function(f, g, h, x) {
      var actual = R.composeK(f, g, h)(x).value;
      var expected = R.chain(f, R.chain(g, h(x))).value;
      return actual === expected;
    }
  );

  it('throws if given no arguments', function() {
    assert.throws(
      function() { R.composeK(); },
      function(err) {
        return err.constructor === Error &&
          err.message === 'composeK requires at least one argument';
      }
    );
  });
});
